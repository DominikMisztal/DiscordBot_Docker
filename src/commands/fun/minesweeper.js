const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('minesweeper')
		.setDescription('Creates field for a minesweeping game'),
	async execute(interaction) {
		await interaction.reply(generateMinefield());
	},
};

function generateMinefield(){
	var mineArray = generateArray(8);
	mineArray = placeBombs(mineArray);
	return arrayToString(mineArray);
}

function generateArray(size){
	var array = new Array(size);
	for (let i = 0; i < size; i++){
		array[i] = new Array(size);
		for (let j = 0; j< size; j++){
			array[i][j] = 0;
		}
	}
	return array;
}

function arrayToString(array){
	var str = '';
	for (let i = 0; i < array.length; i++){
		for (let j = 0; j< array.length; j++){
			if(array[i][j] == 9){
				str = str + '||:bomb:||';
			} else if (array[i][j] == 0){
				str = str + '||:zero:||';
			} else if (array[i][j] == 1){
				str = str + '||:one:||';
			} else if (array[i][j] == 2){
				str = str + '||:two:||';
			} else if (array[i][j] == 3){
				str = str + '||:three:||';
			} else if (array[i][j] == 4){
				str = str + '||:four:||';
			} else if (array[i][j] == 5){
				str = str + '||:five:||';
			} else if (array[i][j] == 6){
				str = str + '||:six:||';
			} else if (array[i][j] == 7){
				str = str + '||:seven:||';
			}
			
		}
        str = str + '\n';
	}
	return str;
}

function placeBombs(array){
	var bombsCount = Math.round((array.length * array[0].length) * 0.15);
	var counter = 0;
	var i = 0;
	var j = 0;
	while(counter < bombsCount){
		i = Math.floor(Math.random() * 8);
		j = Math.floor(Math.random() * 8);
		if(array[i][j] != 9){
			array[i][j] = 9;
			counter = counter + 1;
			increaseAround(array, i, j);
		}
	}
	return array;
}

function increaseAround(array, i, j){
	if(i > 0 && j > 0){
		if(array[i-1][j-1] != 9){
			array[i-1][j-1]++;
		}
	}
	if(i > 0){
		if(array[i-1][j] != 9){
			array[i-1][j]++;
		}
	}
	if(i > 0 && j < array[0].length-1){
		if(array[i-1][j+1] != 9){
			array[i-1][j+1]++;
		}
	}

	if(j > 0){
		if(array[i][j-1] != 9){
			array[i][j-1]++;
		}
	}
	if(j < array[0].length-1){
		if(array[i][j+1] != 9){
			array[i][j+1]++;
		}
	}

	if(i < array.length-1 && j > 0){
		if(array[i+1][j-1] != 9){
			array[i+1][j-1]++;
		}
	}
	if(i < array.length-1){
		if(array[i+1][j] != 9){
			array[i+1][j]++;
		}
	}
	if(i < array.length-1 && j < array[0].length-1){
		if(array[i+1][j+1] != 9){
			array[i+1][j+1]++;
		}
	}
}