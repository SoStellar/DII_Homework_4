var singleStudentResult = document.getElementById('single_student_result')
var listStudentResult = document.getElementById('output')
var addUserDetail = document.getElementById('addUserDetail')
var editUserDetail = document.getElementById('editUserDetail')
var studentIdGET = ''
function addStudentData(student) {
    let idElem = document.getElementById('id')
    idElem.innerHTML = student.id
    let studentIdElem = document.getElementById('studentId')
    studentIdElem.innerHTML = student.studentId
    let nameElem = document.getElementById('name')
    nameElem.innerHTML = `${student.name} ${student.surname}`
    let gpaElem = document.getElementById('gpa')
    gpaElem.innerHTML = student.gpa
    let profileElem = document.getElementById('image')
    profileElem.setAttribute("src", student.image)
}

function addStudentToTable(index,student){
    const tableBody = document.getElementById('tableBody')
    let row = document.createElement('tr')
    let cell = document.createElement('th')
    cell.setAttribute('scope','row')
    cell.innerHTML = index
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = `${student.name} ${student.surname}`
    cell.addEventListener('click',function(){
        showStudentBlock(student)
    })
    row.appendChild(cell)
    cell = document.createElement('td')
    cellbeforeImg= document.createElement('div')
    cellbeforeImg.classList.add('img-fluid')
    let img = document.createElement('img')
    img.setAttribute('src',student.image)
    img.height = 200
    img.classList.add('img-thumbnails')
    img.style.width = "5rem"
    cellbeforeImg.appendChild(img)
    cell.appendChild(cellbeforeImg)
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.gpa
    row.appendChild(cell)
    cell = document.createElement('td')
    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-primary')
    button.setAttribute('type', 'button')
    button.innerText = 'edit'
    button.addEventListener('click', function(){
            editUserDetail.style.display = 'block'
            studentIdGET = student.id
            document.getElementById('nameInput2').value = student.name
            document.getElementById('surnameInput2').value = student.surname
            document.getElementById('studentIdInput2').value = student.studentId
            document.getElementById('gpaInput2').value = student.gpa
            document.getElementById('imageLinkInput2').value = student.image
    })
    cell.appendChild(button)
    row.appendChild(cell)
    cell = document.createElement('td')
    button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-danger')
    button.setAttribute('type', 'button')
    button.innerText = 'delete'
    button.addEventListener('click', function(){ 
        let cf = confirm(`ท่านต้องการลบคุณ ${student.name} หรือไม่`)
        if(cf) {
            deleteStudent(student.id)
        }
    })
    cell.appendChild(button)
    row.appendChild(cell)
    tableBody.appendChild(row)
}
function addStudentList(studentList){
    let counter = 1
    const tableBody = document.getElementById('tableBody')
    tableBody.innerHTML = ''
    for(student of studentList){
        addStudentToTable(counter++,student)
    }
}
function addStudentToDB(student){
    fetch('https://dv-student-backend-2019.appspot.com/students',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(student)
    }).then(response => {
        if(response.status === 200){
        return response.json()
    }else{
        throw Error(response.statusText)
    }
    }).then(data => {
        console.log('success',data)
        showAllStudents()
    })
}

function deleteStudent(id){
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`,{
        method: 'DELETE'
    }).then(response =>{
        if(response.status === 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data =>{
        alert(`student name ${data.name} is now deleted`)
        showAllStudents()
    }).catch(error =>{
        alert('your input student id is not in the database')
    })
}
function editStudentToDB(student){
    fetch('https://dv-student-backend-2019.appspot.com/students',{
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(student)
    }).then(response => {
        if(response.status === 200){
        return response.json()
    }else{
        throw Error(response.statusText)
    }
    }).then(data => {
        console.log('edit success',data)
        EditAllStudents()
    })
}
function onLoad(){
    showAllStudentBlock()
}
function onAddStudentClick(){
    let student = {}
    student.name = document.getElementById('nameInput').value
    student.surname = document.getElementById('surnameInput').value
    student.studentId = document.getElementById('studentIdInput').value
    student.gpa = document.getElementById('gpaInput').value
    student.image = document.getElementById('imageLinkInput').value
    addStudentToDB(student)
}
function onEditStudentClick(){
    let student = {}
    student.id = studentIdGET
    student.name = document.getElementById('nameInput2').value
    student.surname = document.getElementById('surnameInput2').value
    student.studentId = document.getElementById('studentIdInput2').value
    student.gpa = document.getElementById('gpaInput2').value
    student.image = document.getElementById('imageLinkInput2').value
    editStudentToDB(student)
}
function showAllStudents(){
    fetch('https://dv-student-backend-2019.appspot.com/students')
    .then((response)=>{
        return response.json()
    }).then(data =>{
        addStudentList(data)
    })
}
function hideAll(){
    singleStudentResult.style.display='none'
    listStudentResult.style.display='none'
    addUserDetail.style.display='none'
    editUserDetail.style.display='none'
}
document.getElementById('searchButton').addEventListener('click',() =>{
    let id = document.getElementById('inputText').value
    console.log(id)
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`)
    .then(response =>{
        return response.json()
    }).then(student => {
        addStudentData(student)
    })
})
document.getElementById('allStudentMenu').addEventListener('click', (event) =>{
    showAllStudentBlock(student)
})
document.getElementById('addStudentMenu').addEventListener('click',(event)=>{
    hideAll()
    addUserDetail.style.display = 'block'
})
document.getElementById('searchMenu').addEventListener('click',(event)=>{
    
})
function showStudentBlock(student){
    hideAll()
    singleStudentResult.style.display = 'block'
    addStudentData(student)
}
function showAllStudentBlock(student){
    hideAll()
    listStudentResult.style.display = 'block'
    showAllStudents()
}