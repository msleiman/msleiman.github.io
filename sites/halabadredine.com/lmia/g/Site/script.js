/*------------------------------------------------------------------
	Web Gallery Wizard 
	
	Copywright KOMOTION, Inc. 2003,2004
	
------------------------------------------------------------------*/

var cSlideShowTimeout = 4000;
var iSlideCurrent = -1;
var timeoutid = "";

var g_fIEBrowser = (window.navigator.userAgent.toLowerCase().indexOf('msie') != -1);
var g_fApplyFilterToImage = g_fIEBrowser;

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function NavigateImage(iDir)
{
	StopSlideShow();

	var strSource = GetFileName(document.getElementById("MainImage").src);
	var oMainDoc = window.parent.document;
	for (i = 0; i<oMainDoc.images.length; i++)
	{
		if (strSource == GetFileName(oMainDoc.images.item(i).src))
		{
			if ((i+iDir) >= 0 && (i+iDir) < oMainDoc.images.length)
			{
				resetImageOnObject(oMainDoc.images.item(i));
				oMainDoc.images.item(i+iDir).parentNode.focus();
				if (g_fIEBrowser)
				{
					oMainDoc.images.item(i+iDir).click();
				}
				else
				{
					window.open(oMainDoc.images.item(i+iDir).parentNode.href,"_self");
				}
				break;
			}
		}
	}
}

function GetFileName(strFileName)
{
	var rgData = strFileName.split("/");
	if (rgData.length > 0)
		return rgData[rgData.length-1];
	else
		return "";
}

function StopSlideShow()
{
	var SlideShowPlay = document.getElementById("SlideShowPlay");
	parent.window.fSlideShow = false;
	SlideShowPlay.src = "../../Site/images/WGW_SlidePlay.gif";
	iSlideCurrent = -1;
}

function runSlides()
{
	var SlideShowPlay = document.getElementById("SlideShowPlay");
	
	if (parent.window.fSlideShow == true)
	{
		SlideShowPlay.src = "../../Site/images/WGW_SlideStop.gif";
		timeoutid = setTimeout("Ticker()", cSlideShowTimeout);
	}
	else
	{
		SlideShowPlay.src = "../../Site/images/WGW_SlidePlay.gif";
		if (timeoutid != "")
			clearTimeout(timeoutid);
	}
}

function SlideShow()
{
	var SlideShowPlay = document.getElementById("SlideShowPlay");
	
	// toggle the existing state
	parent.window.fSlideShow = !parent.window.fSlideShow;
	
	// start or stop the slide show
	if (parent.window.fSlideShow == true)
	{
		SlideShowPlay.src = "../../Site/images/WGW_SlideStop.gif";
		NavigateSlideShow();
		timeoutid = setTimeout("Ticker()", cSlideShowTimeout);
	}
	else
	{
		SlideShowPlay.src = "../../Site/images/WGW_SlidePlay.gif";
		if (timeoutid != "")
			clearTimeout(timeoutid);
	}
}

function Ticker()
{
  if (g_fIEBrowser)
   {
	   if (document.readyState == "complete")
   	   {
		// navigate to the next image in album and set another timer
		NavigateSlideShow();
   	   }
   }
   else
   {
	NavigateSlideShow();
   }
   timeoutid = setTimeout("Ticker()", cSlideShowTimeout);
}

function NavigateSlideShow()
{
	if (parent.window.fSlideShow == false)
	{
	StopSlideShow();
	return;
	}
	var strSource = GetFileName(document.getElementById("MainImage").src);
	var oMainDoc = window.parent.document;
	if (iSlideCurrent == -1)
	{
		for (i = 0; i<oMainDoc.images.length; i++)
		{
			if (strSource == GetFileName(oMainDoc.images.item(i).src))
			{
			iSlideCurrent = i;
			break;
			}
		}
	}
	
	resetImageOnObject(oMainDoc.images.item(iSlideCurrent));
	iSlideCurrent = (iSlideCurrent +1) % (oMainDoc.images.length-1);
	if (!g_fIEBrowser)
	{
		if (iSlideCurrent == 0)
			iSlideCurrent = 1;
	}

	oMainDoc.images.item(iSlideCurrent).parentNode.focus();

	if (g_fIEBrowser)
	{
		oMainDoc.images.item(iSlideCurrent).click();
	}
	else
	{
		window.open(oMainDoc.images.item(iSlideCurrent).parentNode.href,"_self");
	}

	parent.window.fSlideShow = true;
}

function CheckSlideShow()
{
	runSlides();		
}	

function SlideShowMouseOver()
{
	var SlideShowPlay = document.getElementById("SlideShowPlay");
	if (parent.window.fSlideShow == true)
	{
		SlideShowPlay.src = "../../Site/images/WGW_SlideStop_f2.gif";
		SlideShowPlay.style.cursor='hand';
	}
	else
	{
		SlideShowPlay.src = "../../Site/images/WGW_SlidePlay_f2.gif";
		SlideShowPlay.style.cursor='hand';
	}
}

function SlideShowMouseOut()
{
	var SlideShowPlay = document.getElementById("SlideShowPlay");
	if (parent.window.fSlideShow == true)
	{
		SlideShowPlay.src = "../../Site/images/WGW_SlideStop.gif";
		SlideShowPlay.style.cursor='default';
	}
	else
	{
		SlideShowPlay.src = "../../Site/images/WGW_SlidePlay.gif";
		SlideShowPlay.style.cursor='default';
	}
}
