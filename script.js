function setClickable(cell, length){
		//получаем позицию кликнутой ячейки
		var position = cell.data("position");
		// определяем кликабельные ячейки
		var clickable = [
			(position-length > 0)? position-length : null,
			(Number(position)+Number(length) <= Number(length)*Number(length))? Number(position)+Number(length) : null,
			(Math.floor((position-1)%length)!= 0)?position-1: null,
			(Math.floor((position+1)%length) != 1)?position+1: null
			]		
		//добовляем класс кликабельным ячейкам
		clickable.forEach(function (item) {
			$('.cell[data-position='+item+']').addClass("clickable");
		})
	}
		

	function setField(length) {
		//создаем массив с ячейками где ключ => позиция, значение => содержание
		var arr  = [];
		for (var i = 1; i < length*length; i++) {
			arr.push(i);
		}
		//добавляем пустой элемент
		arr.push("");
		//сортируем массив в случайном порядке
		arr.sort(
			function() { 
				return 0.5 - Math.random(); }
			);
		//отчищаем поле
		$(".field").empty();
		// создаем поле
		arr.forEach(
			function(value, key){
				if (value) {
					$(".field").append('<div class="cell" data-position="'+(key+1)+'">'+value+'</div>');}
				else{
					$(".field").append('<div class="cell zero" data-position="'+(key+1)+'">'+value+'</div>');}
			})
		setClickable($('.zero'), length);
		$('.field').css('width', (length*60)+"px");
		$('.field').css('height', (length*60)+"px");
		// навешиваем события
		$(".cell").click(
				function(){
					//проверяем был ли клик по кликабельной ячейке
					if ($(this).hasClass("clickable")) {
						// удаляем классы кликабельных ячеек
						$(".clickable").removeClass("clickable");
						// получаем значение кликнутой ячейки и переставляем к пустым значением
						var number = $(this).text();
						$('.zero').text(number).removeClass("zero");
						$(this).text("").addClass("zero");
						setClickable($(this), length);	
						//проверяем решена ли задача
						if (check()) {
							$(".field").html("<div class='wintext'>Вы победили!</div>");
						}
						}
					}	
				)

	}
	// функция для установки размеров поля
	function setnewField() {
		var newLength = $('input[type="number"]').val();
		setField(newLength);	
	}
	//функция проверяет все ли ячейки выстроены
	function check() {
		var cells = $('.cell');
		for (var i = 0; i < cells.length; i++) {
		 	if($(cells[i]).data("position") != $(cells[i]).text() && $(cells[i]).data("position") != cells.length){		 		
		 		return false;
		 	}
		}
		return true;
	}

	$(document).ready(function(){
		setField(4);
	})