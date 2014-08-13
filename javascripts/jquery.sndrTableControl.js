(function(jQuery){
$.fn.sndrTableControl = function(options)
{
	var table = this;
	var control_box = table;
	if(typeof(options.panel) === 'undefined')
	{
		options.panel = $('body');
	}
	table.attr('tabindex',1);
	table.css('outline','none');
	options.panel.scrollTop(0);
	selectRow(table.find('tbody tr:first'));
	
	table.find('tbody td')
	.unbind('click').bind('click', function()
	{
		table.find('tr').removeClass(options.class_row_selected);
		selectRow($(this).parents('tr:first'));
	})
	.unbind('dblclick').bind('dblclick', function()
	{
		$(this).click();
		options.fn_enter($(this).parents('tr:first'));
	});
	
	function selectRow(row)
	{
		row.addClass(options.class_row_selected);
	}
	function unselectRow(row)
	{
		row.removeClass(options.class_row_selected);
	}

	var function_map = {
		13:'fn_enter',
		32:'fn_space',
		27:'fn_escape',
		37:'fn_left',
		39:'fn_right',
		45:'fn_insert',
		46:'fn_delete'
	};
	
	return this.each(function()
	{
		control_box.unbind('keydown').bind('keydown',function(e)
		{
			var selected = table.find('tbody tr.' + options.class_row_selected + ':first');
			if(e.isDefaultPrevented())
			{
				return;
			}
			e.preventDefault();
			
			/*FUNCTIONS*/
			$.each(function_map,function(code,handler)
			{
				if(e.keyCode === parseInt(code,10) && typeof(options[handler]) === "function")
				{
					options[handler](selected,e.ctlrKey);
				}
			});
			
			/*MOVEMENT*/
			if($.inArray(e.keyCode,[33,34,35,36,38,40]) >= 0)
			{
				var rows = table.find('tbody tr');
				var rows_amount = rows.size() - 1;
				var index = rows.index(selected);
				var step = 0;
				switch(e.keyCode)
				{
					case 33: step = Math.ceil(options.panel.height() / selected.height()) * -1; break;
					case 34: step = Math.ceil(options.panel.height() / selected.height()); break;
					case 35: step = rows_amount - index; break;
					case 36: step = index * -1; break;
					case 38: step = -1; break;
					case 40: step = 1; break;
				}
				if(index + step < 0)
				{
					step = index * -1;
				}
				if(index + step > rows_amount)
				{
					step = rows_amount - index;
				}
				if(step !== 0)
				{
					unselectRow(selected);
					selectRow(rows.eq(index + step));
					var pos = ((index) * selected.height()) - (options.panel.height() / 2) + (selected.height() * step);
					/*abnormal height of the last row in table*/
					if(index === rows_amount && step < 0) 
					{
						pos += (index + selected.height());
					}
					options.panel.scrollTop(pos);
					e.preventDefault();
				}
				return;
			}
		});
	});
};
})(jQuery);
