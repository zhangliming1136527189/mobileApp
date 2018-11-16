$(function() {
	//数量增加操作
	$(".add").click(function() {
			var max = $(this).prev().prev().prev().val();
			var n = $(this).prev().val();
			var num = parseInt(n) + 1;
			if (num == max) {
				$(this).attr('disabled', true)
			}
			if (num != 0) {
				$(this).prev().prev().attr('disabled', false)
			}
			$(this).prev().val(num);
		})
		//数量减少操作
	$(".min").click(function() {
		var max = $(this).prev().val();
		var n = $(this).next().val();
		var num = parseInt(n) - 1;
		if (num == 0) {
			$(this).attr('disabled', 'disabled')
		}
		if (num != max) {
			$(this).next().next().attr('disabled', false)
		}
		$(this).next().val(num);
	})
})