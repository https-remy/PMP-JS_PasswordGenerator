const charsSet = {
	numbers: addASet(48, 57),
	lowercaseChars: addASet(97, 122),
	uppercaseChars: addASet(65, 90),
	symbols: addASet(33, 47) + addASet(58, 64) + addASet(91, 96) + addASet(123, 126),
}

function addASet(from, to) {
	let charsList = "";
	for (let i = from; i <= to; i++) {
		charsList += String.fromCharCode(i);
	}
	return charsList;
}

const range = document.querySelector('input[type="range"]');
const rangeLabel = document.querySelector('.range-group label');
let passWordLength = range.value;

rangeLabel.textContent = `Password Length : ${passWordLength}`;

range.addEventListener('input', handleRange);

function handleRange(e) {
	passWordLength = e.target.value;
	rangeLabel.textContent = `Password Length : ${passWordLength}`;
}

const generateBtn = document.querySelector('.generate-btn');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const errorMessage = document.querySelector('.error-msg');
const passwordContent = document.querySelector('.password-content');

generateBtn.addEventListener("click", generatePassword);

function generatePassword() {
	const checkedDataSets = checkedSets();

	if (!checkedDataSets.length) {
		errorMessage.textContent = "Please select at least one option.";
		return;
	} else errorMessage.textContent = "";

	const concatenatedSets = checkedDataSets.reduce((acc, curr) => acc + curr);
	let password = "";
	const passwordBase = [];

	for (let i = 0; i < checkedDataSets.length; i++) {
		passwordBase.push(checkedDataSets[i][getRandomNumber(0, checkedDataSets[i].length - 1)]);
	}

	for (let i = passwordBase.length; i < passWordLength; i++) {
		const randomIndex = getRandomNumber(0, concatenatedSets.length - 1);
		password += concatenatedSets[randomIndex];
	}

	passwordBase.forEach((char, index) => {
		const randomIndex = getRandomNumber(0, passWordLength);
		password = password.slice(0, randomIndex) + char + password.slice(randomIndex);
	})

	passwordContent.textContent = password;
}

function checkedSets() {
	const checkedSets = [];
	checkboxes.forEach(checkbox => { checkbox.checked && checkedSets.push(charsSet[checkbox.id]) });
	return checkedSets;
}

function getRandomNumber(min, max) {
	let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
	return Math.trunc(randomNumber / 4294967296 * (max - min + 1) + min);
}

const copyBtn = document.querySelector('.copy-btn');
let locked = false;
copyBtn.addEventListener('click', () => {
	if (locked) return;
	navigator.clipboard.writeText(passwordContent.textContent);
	copyBtn.classList.add('active');
	locked = true;
	setTimeout(() => {
		copyBtn.classList.remove('active');
		locked = false;
	}, 1000);
});


