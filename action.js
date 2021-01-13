
    let form = document.querySelector('form');
    let formContainer = document.querySelector('.form-container');
   
    let div = document.querySelector('.div');
    let submitBtn = document.querySelector('.submit');
    let userName = document.querySelector('.name');
    let userDate = document.querySelector('.days');
    let userStart = document.querySelector('.date');
    let startOut = document.querySelector('.startM');


    let date = new Date();
    userStart = date.getUTCDate();
    month = date.getMonth();
    let months = Array(
            'Січня',
            "Лютого",
            "Березня",
            "Квітня",
            "Травня",
            "Червня",
            "Липня",
            "Серпня",
            "Вересня",
            "Жовтня",
            "Листопада",
            "Грудня"
    );

    // let userTime = document.querySelector('.time');
    let out = document.querySelector('.out');
    let btnRem = document.querySelector('.btn-rem');
    let header = document.querySelector('.header .title');

    let ending = document.querySelector('.ending'); //Дострокове закінчення
    let dayEnd = document.querySelector('.day-end');

    // hide form
    if (localStorage.getItem('hidden') === 'true') {
        formContainer.classList.add('none');
        ending.classList.remove('none');
        startOut.classList.remove('none');
         createHero();
    } 

    //проверка ключа дней на пустоту
    if(+localStorage.getItem('days') != null){
        createTable();
    } 

  
    function createHero(){
        let title = document.createElement('h1');
        let daysTitle = document.createElement('span');

        let str = localStorage.getItem('user');
        str.toLocaleLowerCase();
        let newStr = str.split(' ').join('');

        title.innerHTML = `Марафон #<span>${newStr}</span>`;
        header.append(title);
    }

   

    //дни марафона
    function createTable(){
        let days = +localStorage.getItem('days');
        let start = +localStorage.getItem('date');

        startOut.innerHTML = `Pозпочато ${start} ${months[month]}`;
        for(let i = 0; i <= days -1 ;i++){

                    let label = document.createElement('label');
                   

                    let li = document.createElement('input');
                    li.setAttribute('type', 'checkbox');
                    li.className = 'list';
                    li.setAttribute('value',i + 1 );
                    label.append(li);
                    label.innerHTML += `День ${i + 1}`;
                   div.appendChild(label);        
                }
    }
   


    let list = document.querySelectorAll('.list');
    list.forEach(elems => {
        let flag = elems.getAttribute('value');
          
        //проверка отмеченого дня
        if(localStorage.getItem(flag)  === elems.getAttribute('value')){
            elems.setAttribute('disabled', '');
            elems.setAttribute('checked','true');
            elems.classList.add('ch');
        } 
        if(elems.checked){
            elems.closest('label').classList.add('done');
        }

        //отмечать после указанного времени
        let time = new Date();
        let currentTime = time.getHours();
       if(+localStorage.getItem('time') >= currentTime){
        
       }

        elems.addEventListener('click', function(){
            
        if(confirm(`Закінчити ${ elems.getAttribute('value')}-й день марафону?`)){


                    localStorage.setItem(flag, flag);
                    elems.setAttribute('disabled', '');
                    elems.classList.add('ch');

                    if(elems.checked){
                        elems.closest('label').classList.add('done');
                        
                    }
                    // напоминаниечерез 24 часа

                  
                   // оповещение об окончании дня
                        dayEnd.innerHTML = `День <b>${ elems.getAttribute('value')}</b> завершено`;

                        setTimeout(()=>{
                            location.reload();
                        }, 2000);

  
                    // alert('День '+ elems.getAttribute('value') + " завершено");      
                }
        });

    });
    
 // напоминаниечерез 24 часа


 let notific = function notificationMessage(){
  // Проверка поддержки браузером уведомлений
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Проверка разрешения на отправку уведомлений
  else if (Notification.permission === "granted") {
    // Если разрешено, то создаем уведомление
    var notification = new Notification("Super",{
        body: 'if i can, you can too!',
        dir: "ltr",
        icon: 'Logo.png'
    });
  }

  // В противном случае, запрашиваем разрешение
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // Если пользователь разрешил, то создаем уведомление
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }

 }

    //очистка по клику
    let str = document.querySelectorAll('.ch');

    console.log(str.length);
    if(str.length === +localStorage.getItem('days') && str.length > 0){
      
        // clearTimeout(notific);
        dayEnd.innerHTML = `Марафон завершено`;

        setTimeout(() => {
           
        if(confirm(' Видалити прогресс?')){
            setTimeout(() => {
                localStorage.clear(); 
                location.reload();
            }, 4000);
            countDowm();
        } 
     
      }, 2000);

      function countDowm(){
        let e = 3;
        let g = setInterval(()=>{
            dayEnd.innerHTML = `Видаляємо прогресс через ${e}c`;
            --e;
         
        }, 1000);

        setTimeout(()=>{
                clearInterval(g);
        },4000);
      }
    } else if( str.length > 0){
        let tm = 60 * 1000 *60 *24;
         setTimeout(()=>{
             notific();
         },tm);
    } else{
clearTimeout(notific);
    }

  
   



//добавляем данные в Localstorage
    submitBtn.addEventListener('click', addToStorage);

    function addToStorage(e) {

        // проверка вводимых значений
        if (userName.value == '' || userDate.value == 0 || userDate.value > 100 || userDate.value == '' || userDate.value < 0) {
            
            e.preventDefault();
            out.innerHTML = "Невірно вказані данні. Ви не ввели назву марафону, або некорректно ввели число. Число має бути від 1 до 100"; 
            out.classList.remove('none');
            if(userName.value == ''){
                userName.classList.add('b-red');
            } else{
                userName.classList.remove('b-red');
            }
            if(userDate.value == ''){
                userDate.classList.add('b-red');
            } else{
                userDate.classList.remove('b-red');
            }
            return false;
        } 
        
        
        else {
            localStorage.setItem('user', userName.value);
            localStorage.setItem('days', userDate.value);
            localStorage.setItem('date', userStart);
            // localStorage.setItem('time', userTime.value);
            localStorage.setItem('hidden', true);

            userName.value == '';
            userDate.value == '';
                
            
        }
    }

    //удалить через n-время

    let removeTime = 24*60*60 * (+localStorage.getItem('days') + 1) * 1000;
    

   function removeAfer(){
    setTimeout(() => {
        localStorage.clear(); 
    }, removeTime); //  время в миллисекундах

   }

    ending.addEventListener('click', function(){
        if(confirm('Ви хочете раніше закінчити?')){
            setTimeout(() => {
                localStorage.clear(); 
                location.reload();
            }, 3000);
        }
    });



    //calendar
    var fecha = new Date();


	function mostrarCalendario(year,month) {

		// variables
		var ahora = new Date(year,month-1,1);
		var ultimo = new Date(year,month,0);
		var primer_dia_semana = (ahora.getDay()==0)?7:ahora.getDay();
		var ultimo_dia_mes = ultimo.getDate();
		var dia = 0;
		var resultado = "<tr>";
		var dia_actual = 0;
 
		var ultima_celda = primer_dia_semana + ultimo_dia_mes;

		for(var i = 1; i <= 42; i++) {

			// El dia que empieza la semana
			if(i == primer_dia_semana) {
				dia = 1;
			}


			if(i < primer_dia_semana || i >= ultima_celda) {
				// celda vacia
				resultado+="<td class='empty'>&nbsp;</td>";
			}
			else {

				// mostramos el dia
				if
					(dia == fecha.getDate() && month == fecha.getMonth() + 1 && year == fecha.getFullYear())
					resultado += "<td class='hoy'>" + dia + "</td>";
				else
					resultado += "<td>" + dia + "</td>";
					dia++;
			}
			
			if(i % 7 == 0) {
				if(dia > ultimo_dia_mes)
				break;
				resultado += "</tr><tr>\n";
			}
		}


		resultado += "</tr>";
 
 		// Meses
		var meses=Array(
			"Enero",
			"Febrero",
			"Marzo",
			"Abril",
			"Mayo",
			"Junio",
			"Julio",
			"Agosto",
			"Septiembre",
			"Octubre",
			"Noviembre",
			"Diciembre"
		);
 
		// Calculamos el siguiente mes y año
		nextMonth = month + 1;
		nextYear = year;
		if (month + 1 > 12) {
			nextMonth = 1;
			nextYear = year + 1;
		}
	 
		// Calculamos el anterior mes y año
		prevMonth = month - 1;
		prevYear = year;
		if(month - 1 < 1) {
			prevMonth = 12;
			prevYear = year - 1;
		}
 
		
		document.getElementById("calendar").getElementsByTagName("tbody")[0].innerHTML=resultado;
	}
 
	mostrarCalendario(fecha.getFullYear(),fecha.getMonth()+1);  


    
    // //форма 
    // function createForm(){
    //     let form = document.createElement('form');
        
    //     //поле названия
    //     let inputName = document.createElement('input');
    //     inputName.setAttribute('type', 'text');
    //     inputName.setAttribute('maxlength', '20');
    //     inputName.classList.add('name');

    //     // поле количества дней
    //     let inputDays = document.createElement('input');
    //     inputDays.setAttribute('type', 'number');
    //     inputDays.setAttribute('min', '0');
    //     inputDays.setAttribute('max', '100');
    //     inputDays.classList.add('days');

    //     let btnSubmit = document.createElement('button');
    //     btnSubmit.innerHTML = 'submit';
    //     btnSubmit.classList.add('submit');



    //     form.append(inputName);
    //     form.append(inputDays);
    //     form.append(btnSubmit);
    //     formContainer.append(form);

    // }
