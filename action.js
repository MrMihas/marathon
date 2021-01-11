window.onload = () => {
    let form = document.querySelector('form');
    let formContainer = document.querySelector('.form-container');
   
    let div = document.querySelector('.div');
    let submitBtn = document.querySelector('.submit');
    let userName = document.querySelector('.name');
    let userDate = document.querySelector('.days');
    let userStart = document.querySelector('.date');

    let date = new Date();
    userStart = date.getUTCDate();
    

    // let userTime = document.querySelector('.time');
    let out = document.querySelector('.out');
    let btnRem = document.querySelector('.btn-rem');
    let header = document.querySelector('.header');

    let ending = document.querySelector('.ending'); //Дострокове закінчення
    let dayEnd = document.querySelector('.day-end');

    // hide form
    if (localStorage.getItem('hidden') === 'true') {
        formContainer.classList.add('none');
        ending.classList.remove('none');
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
            
        };
       
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

                   // оповещение об окончании дня
                        dayEnd.innerHTML = `День <b>${ elems.getAttribute('value')}</b> завершено`;

                        setTimeout(()=>{
                            location.reload();
                        },2000);
                      
                   
                   
                    // alert('День '+ elems.getAttribute('value') + " завершено");
                  
                        
                 
                }

        });

      
      


    });

    //очистка по клику
    let str = document.querySelectorAll('.ch');
    console.log(str.length);
    if(str.length === +localStorage.getItem('days') && str.length > 0){
        dayEnd.innerHTML = `Марафон закінчено!!`;
        setTimeout(() => {
        if(confirm(' Видалити прогресс?')){
            
            setTimeout(() => {
             
                localStorage.clear(); 
                location.reload();
            }, 2000);
        }
        dayEnd.innerHTML = `Видаляємо прогресс`;
      }, 3000);

            // btnRem.classList.remove('none');
            // btnRem.setAttribute('type','submit');
            // btnRem.setAttribute('value','Почати новий марафон');
            // div.appendChild(btnRem);

            // btnRem.addEventListener('click', function(){
                
            //     localStorage.clear(); 
            //     location.reload();
            // });
          
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

    setTimeout(() => {
        localStorage.clear(); 
    }, removeTime); //  время в миллисекундах


    ending.addEventListener('click', function(){
        if(confirm('Ви хочете раніше закінчити?')){
            setTimeout(() => {
                localStorage.clear(); 
                location.reload();
            }, 3000);
        }
    });



    //calendar


    function createCalendar(elem, year, month) {

        let mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
        let d = new Date(year, mon);
  
        let table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';
  
        // пробелы для первого ряда
        // с понедельника до первого дня месяца
        // * * * 1  2  3  4
        for (let i = 0; i < getDay(d); i++) {
          table += '<td></td>';
        }
  
        // <td> ячейки календаря с датами
        while (d.getMonth() == mon) {
          table += '<td>' + d.getDate() + '</td>';
  
          if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
            table += '</tr><tr>';
          }
  
          d.setDate(d.getDate() + 1);
        }
  
        // добить таблицу пустыми ячейками, если нужно
        // 29 30 31 * * * *
        if (getDay(d) != 0) {
          for (let i = getDay(d); i < 7; i++) {
            table += '<td></td>';
          }
        }
  
        // закрыть таблицу
        table += '</tr></table>';
  
        elem.innerHTML = table;
      }
  
      function getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
        let day = date.getDay();
        if (day == 0) day = 7; // сделать воскресенье (0) последним днем
        return day - 1;
      }
 
      let currentDate = new Date();
 let year =  currentDate.getFullYear();
 let month = currentDate.getMonth() + 1;
  
      createCalendar(calendar, year, month);

}


//Дострокове закінчення



    // if(localStorage.getItem('user') == null){
    //     createForm();
    // } 
    
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
