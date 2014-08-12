jquery.sndrTableControl
=======================

A very simple jQuery plugin for control any HTML table.

#How to use

1\. Include external script files
	
```html
<script src='https://code.jquery.com/jquery-1.11.1.min.js'></script>
<script src='jquery.sndrTableControl.js'></script>
```

2\. Define a client-side JavaScript
	
```js
$(document).ready(function()
{
	$('table:first').sndrTableControl({
		fn_enter:function(selected)
		{
			alert('fn_enter\r' + selected.html());
		},
		class_row_selected: 'row-selected'
	}).focus();
});
```

3\. Define style information (for row-selected class)

```html
<style>
.row-selected td
{
	background-color:black;
	color:white;
}		
</style>
```
#Options

```
class_row_selected
```
CSS class for selected row (TR-tag)

```
fn_*(selected_row, ctrl_key)
```
Callback functions for KeyDown event.  
First param - selected row (TR);  
Second param - ctrlKey event attribute (boolean)  
Full list of supported function:
* fn_enter
* fn_space
* fn_escape
* fn_left
* fn_right
* fn_insert
* fn_delete
