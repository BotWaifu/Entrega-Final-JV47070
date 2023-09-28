const allQuestions = [
    {
        question: "¿Cuál es el río más largo del mundo?",
        options: ["El amazonas", "Nilo", "Misisipi", "Yangtsé"],
        correctAnswer: "El amazonas",
        categoria: "Geografia"
    },
    {
        question: "¿Cual es un idioma oficial del Peru?",
        options: ["Español", "Quiché", "Aymara", "wayuunaiki"],
        correctAnswer: "Aymara",
        categoria: "Idiomas"
    },
    {
        question: "¿Contra qué país se enfrentó Perú en la Guerra del Pacífico entre 1879 y 1884?",
        options: ["Chile", "Colombia", "Argentina", "Bolivia"],
        correctAnswer: "Chile",
        categoria: "Historia"
    },
    {
        question: "¿Qué día se celebra la independencia de Perú?",
        options: ["El 28 de julio", "El 4 de julio", "19 de abril", "28 de Octubre"],
        correctAnswer: "El 28 de julio",
        categoria: "Historia"
    }

];

let quizData = allQuestions;
let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById ("option3");
const option4 = document.getElementById ("option4");
const label1 = document.getElementById("label1");
const label2 = document.getElementById("label2");
const label3 =document.getElementById ("label3");
const label4 =document.getElementById ("label4");
const nextButton = document.getElementById("next-button");
const resultDiv = document.getElementById("result");

function displayQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    label1.textContent = currentQuestion.options[0];
    label2.textContent = currentQuestion.options[1];
    label3.textContent =currentQuestion.options [2];
    label4.textContent =currentQuestion.options [3];
    option1.value = currentQuestion.options[0];
    option2.value = currentQuestion.options[1];
    option3.value = currentQuestion.options[2];
    option4.value = currentQuestion.options[3];
    option1.checked = false;
    option2.checked = false;
    option3.checked = false;
    option4.checked = false;
}

function evaluateAnswer() {
    const currentQuestion = quizData[currentQuestionIndex];
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        return; 
    }
    if (selectedOption.value === currentQuestion.correctAnswer) {
        score++;
    }
}

nextButton.addEventListener("click", function() {
    evaluateAnswer();
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        displayQuestion();
    } else {
 
        resultDiv.textContent = `Tu puntuación es: ${score} de ${quizData.length}`;
        nextButton.style.display = "none"; 
    }
});

displayQuestion();

const restartButton = document.getElementById("button");

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultDiv.textContent = ""; 
    nextButton.style.display = "block"; 
    displayQuestion(); 
}

restartButton.addEventListener("click", restartQuiz);

const categoriaFilter = document.getElementById("categoria-filter");

function filtrarPreguntasPorCategoria() {
    const categoriaSeleccionada = categoriaFilter.value;
    
    if (categoriaSeleccionada === "Todas") {
        
        quizData = allQuestions; 
        currentQuestionIndex = 0;
        displayQuestion();
    } else {
       
        const preguntasFiltradas = allQuestions.filter(function(pregunta) {
            return pregunta.categoria === categoriaSeleccionada;
        });

        if (preguntasFiltradas.length > 0) {
            quizData = preguntasFiltradas; 
            currentQuestionIndex = 0;
            displayQuestion();
        } else {
            
            console.log("No hay preguntas en esta categoría.");
        }
    }
}

categoriaFilter.addEventListener("change", filtrarPreguntasPorCategoria);
