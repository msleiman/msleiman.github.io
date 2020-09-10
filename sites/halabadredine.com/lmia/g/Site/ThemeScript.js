/*------------------------------------------------------------------
	Web Gallery Wizard 
	
	Copywright KOMOTION, Inc. 2003,2004
	
------------------------------------------------------------------*/

function applyLightFilter()
{
	if (g_fApplyFilterToImage)
	{
		var oElement = event.srcElement;
		if (typeof(document) == 'object' && typeof(document.activeElement) == 'object')
		{
			if(!(document.activeElement.sourceIndex == (oElement.sourceIndex -1)))
			{
				oElement.style.filter="progid:DXImageTransform.Microsoft.Light()";
				oElement.filters.item("DXImageTransform.Microsoft.Light").addAmbient(255,255,255,100);
				oElement.filters.item("DXImageTransform.Microsoft.Light").addAmbient(255,255,255,25); 
			}
		}
	}
}

function removeLightFilter()
{
	if (g_fApplyFilterToImage)
	{
		var oElement = event.srcElement;
		if (typeof(document) == 'object' && typeof(document.activeElement) == 'object')
		{
			if(!(document.activeElement.sourceIndex == (oElement.sourceIndex -1)))
			{
				oElement.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=100, FinishOpacity=20, Style=1, StartX=0, StartY=0, FinishX=0, FinishY=100)";
			}
		}
	}
}

function resetImage()
{
	if (g_fApplyFilterToImage)
	{
		//event.srcElement.firstChild.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=100, FinishOpacity=20, Style=1, StartX=0, StartY=0, FinishX=0, FinishY=100)";
		resetImageOnObject(event.srcElement.firstChild);
	}
}

function resetImageOnObject(obj)
{
	obj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=100, FinishOpacity=20, Style=1, StartX=0, StartY=0, FinishX=0, FinishY=200)";
}

function SetNormal()
{
	fSlideShow = false;
	
	if (g_fApplyFilterToImage)
	{
		removeLightFilter();
		event.srcElement.style.filter =''
	}
}
