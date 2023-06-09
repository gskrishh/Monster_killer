const ATTACK = 12;
const MONSTER_ATTACK = 20;
const STRONG_ATTACK = 25;
const HEAL_VALUE = 20;

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enteredValue = prompt('Yentha Health kavali','100');
let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let attackValue;
let hasBonusLife = true ;
adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
    let logEntry = {
      event: ev,
      value: val,
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    };
    switch (ev) {
      case LOG_EVENT_PLAYER_ATTACK:
        logEntry.target = 'MONSTER';
        break;
      case LOG_EVENT_PLAYER_STRONG_ATTACK:
        logEntry = {
          event: ev,
          value: val,
          target: 'MONSTER',
          finalMonsterHealth: monsterHealth,
          finalPlayerHealth: playerHealth
        };
        break;
      case LOG_EVENT_MONSTER_ATTACK:
        logEntry = {
          event: ev,
          value: val,
          target: 'PLAYER',
          finalMonsterHealth: monsterHealth,
          finalPlayerHealth: playerHealth
        };
        break;
      case LOG_EVENT_PLAYER_HEAL:
        logEntry = {
          event: ev,
          value: val,
          target: 'PLAYER',
          finalMonsterHealth: monsterHealth,
          finalPlayerHealth: playerHealth
        };
        break;
      case LOG_EVENT_GAME_OVER:
        logEntry = {
          event: ev,
          value: val,
          finalMonsterHealth: monsterHealth,
          finalPlayerHealth: playerHealth
        };
        break;
      default:
        logEntry = {};
    }
    // if (ev === LOG_EVENT_PLAYER_ATTACK) {
    //   logEntry.target = 'MONSTER';
    // } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    //   logEntry = {
    //     event: ev,
    //     value: val,
    //     target: 'MONSTER',
    //     finalMonsterHealth: monsterHealth,
    //     finalPlayerHealth: playerHealth
    //   };
    // } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    //   logEntry = {
    //     event: ev,
    //     value: val,
    //     target: 'PLAYER',
    //     finalMonsterHealth: monsterHealth,
    //     finalPlayerHealth: playerHealth
    //   };
    // } else if (ev === LOG_EVENT_PLAYER_HEAL) {
    //   logEntry = {
    //     event: ev,
    //     value: val,
    //     target: 'PLAYER',
    //     finalMonsterHealth: monsterHealth,
    //     finalPlayerHealth: playerHealth
    // //   };
    // } else if (ev === LOG_EVENT_GAME_OVER) {
    //   logEntry = {
    //     event: ev,
    //     value: val,
    //     finalMonsterHealth: monsterHealth,
    //     finalPlayerHealth: playerHealth
    //   };
    // }
    battleLog.push(logEntry);
  }

function reset(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}
    

function endRound(){
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK);
    currentPlayerHealth -= playerDamage;
    if (currentPlayerHealth<=0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert("inkosari brathuku po");
        
    }
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert("gelichav thanks namaste");
        reset();
    }
    else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0){
         alert("sava dengindi po");
         reset();
    
    }    
     else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0){
     alert("Draw");
     reset();
   }

}

   
   function attackingType(mode){
    const attackValue = mode === 'ATTACK' ? ATTACK : STRONG_ATTACK;
    const damage = dealMonsterDamage(attackValue);
    currentMonsterHealth -= damage;
    endRound();
   }

function attackHandler(){
    attackingType('ATTACK');   
}

function strongAttackHandler(){
    attackingType('STRONG_ATTACK');
}

function heal(){
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal to more than your max initial health.");
    healValue = chosenMaxLife - currentPlayerHealth;
    } else {
    healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    endRound();
                  
}

function healHandler(){
    console.log('panichestundi...');
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', heal);
logBtn.addEventListener('click', healHandler);