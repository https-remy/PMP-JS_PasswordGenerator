const copyBtn = document.querySelector('.copy-btn');
const passwordContent = document.querySelector('.password-content');

copyBtn.addEventListener('click', () => {
	navigator.clipboard.writeText(passwordContent.textContent);
});

const charsSet = {
	numbers: addASet(48, 57),
	lowercaseChars: addASet(97, 122),
	uppercaseChars: addASet(65, 90),
	symbols: addASet(33, 47) + addASet(58, 64) + addASet(91, 96) + addASet(123, 126),
}

const generateBtn = document.querySelector('.generate-btn');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const errorMessage = document.querySelector('.error-msg');

generateBtn.addEventListener("click", generatePassword);

function generatePassword() {
	const checkedDataSets = checkedSets();

	if (!checkedDataSets.length) {
		errorMessage.textContent = "Please select at least one option";
		return;
	} else {
		errorMessage.textContent = "";
	}
}

function checkedSets() {
	const checkedSets = [];
	checkboxes.forEach(checkbox => { checkbox.checked && checkedSets.push(checkbox.id) });
	console.log(checkedSets);
	return checkedSets;
}

function getRandomNumber(min, max) {
	let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
	return randomNumber / 4294967296 * (max - min + 1) + min;
}

function addASet(from, to) {
	let charsList = "";
	for (let i = from; i <= to; i++) {
		charsList += String.fromCharCode(i);
	}
	return charsList;
}



