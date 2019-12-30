let myLibrary = [];
let addBtn = document.querySelector('.submit');


function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return (this.title + ' by ' + this.author + 
        ', ' + this.pages + ', ' + 
        (this.read?"have read.":"have not read."));
    }
};

//////////////Switch toggle for form hide
let formSwitch = document.querySelector('.addBook');


let formVis=false;

formSwitch.addEventListener('click', function(){
    document.querySelector('.formDrop').classList.toggle('hiddenForm')
    formVis=!formVis;
    if(formVis){
    formSwitch.textContent = "Hide form"
    }else{
        formSwitch.textContent = 'Add a New Book'
    }
})
/////////////////////////////////////Remove Button func (and reassign values for remove)

function removeBtn(){
  let rmButArr = document.querySelectorAll("button.remove");
  rmButArr.forEach(e=>{
      e.addEventListener("click", function(){
          console.log(e.attributes['data-index'].value)
          myLibrary.splice(e.attributes['data-index'].value,1);
          
          render();
          
        
      })
  })}
//////////////////////////////////Toggle State button
function readState(){
    let readButt = document.querySelectorAll('button.toggleState');
    readButt.forEach(e=>{
        e.addEventListener('click', function(){
          myLibrary[e.attributes["data-index"].value].read = !myLibrary[e.attributes["data-index"].value].read 
          render();
          
            })
            
   })
}
////////////////////////////clear content to remove duplicates
function reset(){
    document.querySelectorAll('tr.libRow').forEach(e=>e.remove());
    }

/////////////////////////////////////Render content

function render(){
    let table = document.querySelector('.booksTable');    
    reset();
    myLibrary.forEach(e=>{
        let row = document.createElement('tr')
        row.classList.add('libRow')
        row.setAttribute(`data-index`,myLibrary.indexOf(e));
        row.innerHTML = 
            `<td>${e.title}</td>
            <td>${e.author}</td>
            <td>${e.pages}</td>
            <td>${e.read}</td>
            <td><button data-index = "${myLibrary.indexOf(e)}" class = 'remove' >Remove</button></td>
            <td><button data-index = "${myLibrary.indexOf(e)}" class = "toggleState">Change State</button></td>`;
        table.appendChild(row);
        })
     removeBtn();
     readState();   
    }
      


///Add book to array on submit
addBtn.addEventListener('click',function(){
    let newBook = new Book(document.getElementById('title').value, document.getElementById('author').value, document.getElementById('pages').value, document.getElementById('read').checked)
    myLibrary.push(newBook);
    render();
    removeBtn();
    readState();
    
})


///add dummy books

let gral = new Book('Ubik','Philip K. Dick',666,false);
let fral = new Book('Snowcrash','Neal Stephenson', 42069, true);
let kral = new Book('Neuromancer','William Gibson',69,true)
let tral = new Book('The Disposessed', 'Ursula K. Leguin', 69696969, true)
let rral = new Book('Wheel of Time','Robert Jordan',6969,false);
myLibrary.push(gral,fral,kral, tral, rral);

///////////////////////





//////////////exec@load
render();


