
fetch('preguntas.json')
    .then(response => response.json())
    .then(data => {
        quizData = data;
        displayQuestion();
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });

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

    const isCorrect = selectedOption.value === currentQuestion.correctAnswer;
    const feedback = isCorrect ? "Respuesta correcta" : "Respuesta incorrecta";


    resultDiv.textContent = feedback;

    if (isCorrect) {
        score++;
    }
}

function executeAfterClick(button, callback) {
    button.addEventListener("click", function() {
        callback();
    });
}


const restartButton = document.getElementById("button");

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultDiv.textContent = ""; 
    nextButton.style.display = "block"; 
    displayQuestion(); 
}

restartButton.addEventListener("click", restartQuiz);
const allQuestions = [];

const categoriaFilter = document.getElementById("categoria-filter");

function filtrarPreguntasPorCategoria() {
    const categoriaSeleccionada = categoriaFilter.value;

    if (categoriaSeleccionada === "Todas") {
        currentQuestionIndex = 0;
        displayQuestion();
    } else {
        const preguntasFiltradas = quizData.filter(pregunta => pregunta.categoria === categoriaSeleccionada);

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

let quizData = JSON.parse(localStorage.getItem('quizData')) || [];
let currentQuestionIndex = JSON.parse(localStorage.getItem('currentQuestionIndex')) || 0;
let score = JSON.parse(localStorage.getItem('score')) || 0;


function saveQuizState() {
    localStorage.setItem('quizData', JSON.stringify(quizData));
    localStorage.setItem('currentQuestionIndex', JSON.stringify(currentQuestionIndex));
    localStorage.setItem('score', JSON.stringify(score));
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultDiv.textContent = "";
    nextButton.style.display = "block";
    displayQuestion();
    saveQuizState(); 
}


executeAfterClick(nextButton, function() {
    evaluateAnswer();
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        displayQuestion();
        saveQuizState();
    } else {
        resultDiv.textContent = `Tu puntuación es: ${score} de ${quizData.length}`;
        nextButton.style.display = "none";
        saveQuizState(); 
    }
});
