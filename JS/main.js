/*
// string 
let fname = 'John'
console.log('fname', fname)
const idcard = "AB1234567"

// number
let age = 30
let height = 150.5
const pi = 3.14158265359

fname = 'Tom'

//idcard = 'car'

console.log('idcard', idcard)

console.log('name', fname, 'age', age)
console.log('age', age);
*/

// condition statements (if-else)
// || && ! == != > < >= <=
/*
let number1 = 3
let number2 = 3

if (number1 != number2) {
    console.log('This if ')
} else if (number1 == number2) {
    console.log('This else if')
} else  
    console.log('This else')
let score = 55
if (score >= 80) {
    console.log('Grade : A')
} else if (score >= 70) {
    console.log('Grade : B')
} else if (score >= 60) {
    console.log('Grade : C')
} else if (score >= 50) {
    console.log('Grade : D')
} else {
    console.log('Grade : F')
}

let number1 = 5
let number2 = 10

let condition = number1 >= 3 && number2 >= 11   
console.log('result of condition', condition)

 
let number = 20
if (number % 2 == 0){
    console.log('You are event.')
}

let counter = 0

while (counter <= 10){
    console.log('Hi')
    counter+=1
}

for(let counter = 0;counter < 10; counter++){
    console.log('Hi')
}
let age1 = 20
let age2 = 25
let age3 = 30

let ages = [20,25,30]
ages = [200,100,50]
console.log('age1 age2 age3' ,age1,age2,age3)
console.log('age', ages)

console.log('index' ,ages[0])

ages.push(25)
console.log('pushed array' ,ages[3])

let ages = [50, 20, 25, 30, 35, 40]

ages.sort()
console.log(ages)

let name_list = ['aa', 'bb', 'cc']
name_list.push('dd')
name_list.pop()
console.log(name_list)
console.log('name_list lenght' ,name_list.length)

for (let index = 0; index<name_list.length;index++){
    console.log(name_list[index])
}

let student = [{
    age: 30,
    name: 'aa',
    grade: 'A'
},{
    age: 30,
    name: 'bb',
    grade: 'B'
}]


for (let index = 0; index < student.length; index++){
    console.log('Student number', (index + 1))
    console.log("name", student[index].age)
    console.log("age", student[index].name)
    console.log("grade", student[index].grade)
}
// function

let score1 = 55
let score = 65

let grade = ''

function calculate_grade(score){
if (score>= 80){
    grade = 'A'
}else if (score >=70){
    grade = 'B'
}else if (score >=60){
    grade = 'C'
}else if (score >=50){
    grade = 'D'
}else{
    grade = 'F'
}
return grade
}

let grade1 = calculate_grade(score1)

console.log('Grade', grade1)


let score = [20, 30, 40, 50]

for (let index = 0; index < score.length; index++){
    console.log('Score', score[index])
}
/*
score[0] = score[0] * 2
score[1] = score[1] * 2
score[2] = score[2] * 2
score[3] = score[3] * 2 

score = score.map((s) =>{
    return s * 2
})  
*/
/*
let newScore = score.filter((s) =>{
    if (s>=30){
        return true
    }else{
        return false
    }
})

newScore.forEach((ns) => {
    console.log('New score', ns)
})


let students = [{
    name: 'aa',
    score: 50,
    grade: 'D'
},{
    name: 'bb',
    score: 80,
    grade: 'A'
}]

let Student = students.find((s) => {
    if (s.name == 'aa'){
        return true
    }
})

let double_score = students.map((s) =>{
    s.score = s.score * 2
    return s
})

let highScore = students.filter((s) =>{
    if(s.score >= 120)
        return true
})

console.log(Student)
console.log(double_score)
console.log(highScore)
*/










