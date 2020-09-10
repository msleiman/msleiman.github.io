<?php
/****************************************************/
/* CoffeeCup Software Form to Mail program          */
/* (C) 2005 CoffeeCup Software                      */
/****************************************************/
/* - Companion Program For Coffeecup Form Builder - */
/* Visit - http://www.coffeecup.com                 */
/****************************************************/
/* Constants   */
/* Version     */ $version = '2.2.2';
/* Error Level */ error_reporting(E_ALL & ~E_NOTICE);
/* Text File   */ $saveFile = '[FILENAME]';

//...... Added UTF-8 support

//Config file must be in the same directory as this file
//and have the same first part of the name. i.e. myform.inc.php
list($formName,$ext) =  split('\.',basename($_SERVER['PHP_SELF']),2);
if (file_exists($formName.".inc.php"))
{
        include($formName.".inc.php");
}

//XML file must be in the same directory as this file
$debug = (isset($_REQUEST['debug'])) ? $_REQUEST['debug'] : $debug;
if ($debug) error_reporting(E_ALL);

//...... Display debugging information
if ($debug)
{
        switch($debug)
        {
                case 'info'    :
                   phpinfo();
                   exit();
                break;

                case 'version'  :
                   err("Current MailForm version: <b>".$version."</b><br>Current PHP version: <b>".phpversion()."</b>");
                break;
        }
}


$date=date("l, F dS, Y \a\\t g:i a");
$server=$_SERVER['SERVER_NAME'];

$msg="Here is the information submitted to $formName from $_SERVER[REMOTE_ADDR] on $date\r\n\r\n------------------------\r\n";

//...... Make sure we keep the variables
$subject        = $_REQUEST['subject'];
$thankyoupage   = $_REQUEST['thankyoupage'];
$xmlFile        = $_REQUEST['xmlfile'];
$unreg          = $_REQUEST['uR'];
$email          = $_REQUEST['eM'];

if (file_exists($xmlFile))
{
        $fd = fopen(basename($xmlFile),'r');
        while(!feof($fd))
        {
                $contents .= fgets($fd,1024);
        }
        fclose($fd);
}
else
{
        err("No &lt;xml&gt; data file found<br>Please upload the data xml file ".$_REQUEST['xmlfile']);
}

$file_info = preg_replace("/\r|\n/"," ",$contents);

//...... Includes the form results in your thank you page
$incresults =  (preg_match('/<form.*?includeresults="true".*?>/',$file_info));

//...... Sends email of form results to the user
$emailusr	=  (preg_match('/<form.*?emailuser="true".*?>/',$file_info));

preg_match('/<hidden.*?name="mailto".*?value="(.*?)".*?>/',$file_info,$matches);
$mailto = $matches[1];

preg_match('/<hidden.*?name="thankyoumessage".*?value="(.*?)".*?>/',$file_info,$matches2);
$thanksMsg = unhtmlentities($matches2[1]);


preg_match('/<form.*?bkcolor2="(.*?)".*?>/',$file_info,$matches3);
$backgroundclr = $matches3[1];

preg_match('/<form.*?fontcolor2="(.*?)".*?>/',$file_info,$matches4);
$fontclr = $matches4[1];

if(!$thanksMsg)
{
    $thanksMsg="Thank you for your form submission!";
}

if(!$subject)
{
  $subject="Form Submission";
}


//...... Reversing array elements so they appear in correct form order
$_REQVARS = array_merge($_POST,$_GET);

//...... Delete them from the request array, we won't need
//...... to send these in the actual email.
unset($_REQVARS['thankyoupage']);
unset($_REQVARS['subject']);
unset($_REQVARS['mailto']);
unset($_REQVARS['xmlfile']);
unset($_REQVARS['thankyoumessage']);
unset($_REQVARS['uR']);
unset($_REQVARS['eM']);


$addtoThank.="<span><p align=\"center\">Below is the information you submitted:</br></br></p><p align=\"center\">";
$txtmsg=$formName.'|'.date("Y-m-d H:i:s").'|'.$_SERVER['REMOTE_ADDR'].'|';

$_REQVARS=array_reverse($_REQVARS);

foreach($_REQVARS as $key=>$value)
{
    $msg .= "$key: ".stripslashes($value)."\r\n\r\n";
    $addtoThank.="$key: ".stripslashes($value)."<br/>";
    $txtmsg .= "$key: ".stripslashes($value)."|";
}

$addtoThank.="</p></span>";
$addtoThank=str_replace("_"," ",$addtoThank);

//...... Write to the text file here
if ($saveFile != '[FILENAME]')
{
        $fd = fopen($saveFile,"a+");
        ccfputcsv($fd, $txtmsg); 
        fclose($fd);
}

if($unreg == 'true')
{
	$unregMsg="<div align=\"center\"><font size=\"1\" face=\"Arial\">Created with CoffeeCup Form Builder <a href=\"http://www.coffeecup.com/\" target=\"_blank\" title=\"CoffeeCup Form Builder\">Download It Here</a></font></div>";
	$msg .= "------------------------\r\n\r\nThis Form was sent to you using CoffeeCup Form Builder.\r\nPlease tell a friend about us: http://www.coffeecup.com/form-builder/\r\n";
}
else
{
	$unregMsg = '';
}

//...... Why are we converting underscores to spaces?
$newMsg=str_replace("_"," ",$msg);

//...... Construct a proper mime/UTF-8 for extended ASCII, and internationalization
$headers = "MIME-Version: 1.0\r\n" . "Content-type: text/plain; charset=UTF-8\r\n\r\n";

//...... If they specify "email" in their form, it will set the reply-to field.
if($email)
{
	$sentMail = mail($mailto,$subject,$newMsg,"Reply-To: $email\r\n$headers");

	//...... MAIL TO USER
	if($emailusr)
	{
		mail($email,$subject,$newMsg,"Reply-To: $mailto\r\n$headers");
	}
}
//...... Send email as regular web server user
else
{
        $sentMail = mail($mailto,$subject,$newMsg,$headers);
}

if (!$sentMail) err("Cannot send email!");

if(!$incresults)
{
        $addtoThank="";
}

if($thankyoupage)
{
  header("Location: $thankyoupage");
}
else
{
         print <<<__EOT__
<html>

<head>
 <title>Form Submitted</title>
 <style type="text/css">
 <!--
 body {
    background-color:$backgroundclr;
 }
 #message {
        width:720px;
    margin:9px auto;
        text-align:center;
    font:bold 14px 'Trebuchet MS',arial,helvetica,sans-serif;
    color:$fontclr;
 }
#message span {
    font-weight:normal;
}
//-->
 </style>
</head>

<body bgcolor="$background-color">
<center>
 <div id="message"><div>$thanksMsg</div>
<br /><br />
$addtoThank
<br /><br />
$unregMsg
</center>
</body>

</html>
__EOT__;

}

function err($string)
{
        global $version;
        echo("<h2 style=\"font:normal 20px 'Trebuchet MS',arial\">$string</h2>");
        echo("<h2 style=\"font:normal 12px 'Trebuchet MX',arial\">Either sendmail or smtp is not properly configured on your system.<br />Please contact your hosting provider to correct this problem.<!-- $version --></h2>");
        exit();
}

function ccfputcsv($handle, $mymsg)
{
   fputs($handle, $mymsg."\n");//stripslashes(substr($str, 0, -1))

   return strlen($mymsg);
}

function unhtmlentities($string)
{
   $trans_tbl = get_html_translation_table(HTML_ENTITIES);
   $trans_tbl = array_flip($trans_tbl);
   return strtr($string, $trans_tbl);
}


?>
