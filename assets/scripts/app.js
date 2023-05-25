const ATTACK = 14;
const STRONG_ATTACK = 17;
const HEAL_VALUE = 20;
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let attackValue;

function attackingType(mode){
    if (mode == "ATTACK"){
        attackValue = ATTACK;
    }
    else {
        attackValue = STRONG_ATTACK;
    }
    
   const damage = dealMonsterDamage(attackValue);
   currentMonsterHealth -= damage;
   const playerDamage = dealPlayerDamage(attackValue);
   currentPlayerHealth -= playerDamage;
   if (currentMonsterHealth <=0 && currentPlayerHealth > 0){
    alert("you won");
   }
   else if (currentPlayerHealth <=0 && currentMonsterHealth > 0){
    alert("you lost");
   }
   else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0){
    alert("Draw");
   }
}

function attackHandler(){
    attackingType('ATTACK');   
}

function strongAttackHandler(){
    attackingType('STRONG_ATTACK');
}

function heal(){
    increasePlayerHealth(HEAL_VALUE);                
}


attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', heal);