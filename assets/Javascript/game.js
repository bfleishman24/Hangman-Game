//========================

var wordBank = [`red` , `blue` , `something` , `hello` , `another`];
// var win = 0;
// var loses = 0;

// the varibale named game is an object housing multiple attributes as well as multiple functions.  
 var game = {
        guessed: [ ],
        left: 12,
        win: 0,
        loses: 0,
        //the objects above have been set to the starting values
        start: function() {
          this.complete = false;
          this.word = wordBank[Math.floor(Math.random() * wordBank.length)];
          this.$right = document.getElementById('right');
          this.$wrong = document.getElementById('wrong');
          this.$remain = document.getElementById('remain');
          this.$right.innerHTML = '_'.repeat(this.word.length);
          this.$win = document.getElementById(`wins`);
          this.$loses = document.getElementById(`loses`)
        }, 
        //The start function acquires a word from var wordbank and determins how many letters are in the word. 
        //The start function is also creating variables that are associted to the appropriate html elements(ids)
        //this.$right.innerhtml is assigning a _ to every letter in the word chosen at the start of the game.
        // this. is always going to be assocaited with the function that called it.(to the left)
      
        guess: function(letter) {
          if (this.left > 0 && this.complete != true) {
            if (this.word.indexOf(letter) > -1 || this.guessed.indexOf(letter) > -1) {
              this.right(letter);
            } else {
              this.wrong(letter);
            }
          }
        },
        // this is the guess function.  The guess function is being called whenever a keypress has happend.  The logic is looking to see
        //whether the letter chosen is a letter in the hidden word or if it is not.  
        // if the letter  is part of the hidden word the right function is to be executed
        //if the letter is NOT part of the hidden word the wrong function is to be executed
        right: function(letter) {
          for(var i = 0; i < this.word.length; i++) {
            if (this.word[i] == letter) {
              var word = this.$right.innerHTML.split('');
              word[i] = letter;
              this.$right.innerHTML = word.join('');
     				            }
          }
          if (this.$right.innerHTML.indexOf('_') < 0) {
            alert('you win!');
            this.win++;
            this.$win.innerHTML = this.win;
            this.complete = true;
            game.start();
            // this.guessed: [ ];
          }

          // the right function is running a for loop based on the hidden word and its looking at the character that was typed.
          // The first if statement is creating a new variable name word and this variable is to refernce the hidden word and split it into individual characters
          // it is then stating if word[i], which identifies the individual letters, is equal to the letter that was pressed
          // place it in the appropriate spot in the HTML meaning the appropriate div and the appropriate irder

          //The second if statement is stating if div has 0 underscores alert the user they won
          // increase the win variable count
          // and create a new game and grab a new random word( I cannot get this to work properly it will not reset the counts or letters guessed)

        },
        wrong: function(letter) {
          this.guessed.push(letter);
          this.$wrong.innerHTML += ' ' + letter;
          this.left--;
          this.$remain.innerHTML = this.left;
          if (this.left < 1) {
            alert('you lose! '+ this.word);
            this.loses++;
            this.$loses.innerHTML = this.loses;
            this.complete = true;
            game.start();
          }
        }
      };
      //When the wrong function gets called the letter that has been pressed has already been identified as not part of the hidden word string
      // and then pushes that letter into the wrong letter class.
      // This function also subtracts a number from the left variable
      // It then updates the HTML to show the amount of guesses left

      //The if statment is saying if the variable left is less than one
      //aleart the user "they lose"  plus the word they lost on
      // I am attempting to reset the game after the wrong function happens but I cannot refresh any of the letters left or letters chosen
      game.start();
      document.onkeyup = function(event) {
        var letter = String.fromCharCode(event.keyCode).toLowerCase();
        game.guess(letter);
      };
      //This is the function calling to start the game.  