/*
   * by balzz
   * dont delate my wm
   * pelase follow instagram: @iqstore78
*/
let handler = m => m

handler.before = function (m) {
  let user = global.db.data.users[m.sender]
        let role = (user.level <= 2) ? 'Newbie l'
          : ((user.level >= 2) && (user.level <= 4)) ? 'Novice ll' 
          : ((user.level >= 4) && (user.level <= 6)) ? 'Apprentice ll'
          : ((user.level >= 6) && (user.level <= 8)) ? 'Journeyman lll'
          : ((user.level >= 8) && (user.level <= 10)) ? 'Pathfinder lV'
          : ((user.level >= 20) && (user.level <= 40)) ? 'Squire V'
          : ((user.level >= 40) && (user.level <= 60)) ? 'Adventurer Vl'
          : ((user.level >= 60) && (user.level <= 80)) ? 'Scout Vll'
          : ((user.level >= 80) && (user.level <= 100)) ? 'Guardian Vlll'
          : ((user.level >= 100) && (user.level <= 120)) ? 'Fighter lX'
          : ((user.level >= 120) && (user.level <= 140)) ? 'Brawler X'
          : ((user.level >= 140) && (user.level <= 160)) ? 'Scrapper Xl'
          : ((user.level >= 160) && (user.level <= 170)) ? 'Brigand Xll' 
          : ((user.level >= 170) && (user.level <= 180)) ? 'Skirmisher XlV' 
          : ((user.level >= 180) && (user.level <= 190)) ? 'Battler XV' 
          : ((user.level >= 190) && (user.level <= 200)) ? 'Marauder XVl' 
          : ((user.level >= 200) && (user.level <= 210)) ? 'Slayer XVll' 
          : ((user.level >= 210) && (user.level <= 220)) ? 'Huntsman XVlll' 
          : ((user.level >= 220) && (user.level <= 230)) ? 'Mercenary XlX' 
          : ((user.level >= 230) && (user.level <= 240)) ? 'Swordsman XX' 
          : ((user.level >= 240) && (user.level <= 250)) ? 'Freelancer XXl' 
          : ((user.level >= 250) && (user.level <= 260)) ? 'Swashbuckler XXll' 
          : ((user.level >= 260) && (user.level <= 270)) ? 'Vanquisher XXlll' 
          : ((user.level >= 270) && (user.level <= 280)) ? 'Chevalier XXlV' 
          : ((user.level >= 280) && (user.level <= 290)) ? 'Duelis XXV' 
          : ((user.level >= 290) && (user.level <= 300)) ? 'Gladiator XXVl' 
          : ((user.level >= 300) && (user.level <= 310)) ? 'Legionnaire XXVll' 
          : ((user.level >= 310) && (user.level <= 320)) ? 'Veteran XXVlll' 
          : ((user.level >= 320) && (user.level <= 330)) ? 'Swordmaster XXlX' 
          : ((user.level >= 330) && (user.level <= 340)) ? 'Keeper XXX' 
          : ((user.level >= 340) && (user.level <= 350)) ? 'Protector XXXl' 
          : ((user.level >= 350) && (user.level <= 360)) ? 'Journalist XXXll' 
          : ((user.level >= 360) && (user.level <= 370)) ? 'Defender XXXlll' 
          : ((user.level >= 370) && (user.level <= 380)) ? 'Gallant XXXlV' 
          : ((user.level >= 380) && (user.level <= 390)) ? 'Knight XXXV' 
          : ((user.level >= 390) && (user.level <= 400)) ? 'Exemplar XXXVl' 
          : ((user.level >= 400) && (user.level <= 410)) ? 'Assasin XXXVll' 
          : ((user.level >= 410) && (user.level <= 420)) ? 'Myrmidon XXXVlll' 
          : ((user.level >= 420) && (user.level <= 430)) ? 'Conqueror XXXlX' 
          : ((user.level >= 430) && (user.level <= 440)) ? 'Lord XL' 
          : ((user.level >= 440) && (user.level <= 450)) ? 'Paladin XLl' 
          : ((user.level >= 450) && (user.level <= 460)) ? 'Hero XLll' 
          : ((user.level >= 460) && (user.level <= 470)) ? 'Champion XLlll' 
          : ((user.level >= 470) && (user.level <= 480)) ? 'Legend XLlV' 
          : ((user.level >= 480) && (user.level <= 490)) ? 'Mythical XLV' 
          : ((user.level >= 490) && (user.level <= 500)) ? 'Savant XLVl' 
          : ((user.level >= 500) && (user.level <= 600)) ? 'Thera XLVll' 
          : ((user.level >= 600) && (user.level <= 700)) ? 'Provost XLVlll' 
          : ((user.level >= 700) && (user.level <= 800)) ? 'Illuminatus XLIX' 
          : ((user.level >= 800) && (user.level <= 900)) ? 'Unreal L' 
          : ((user.level >= 900) && (user.level <= 1000)) ? 'Boundless Ll' 
          : ((user.level >= 1000) && (user.level <= 100000000)) ? 'DemiaGod Lll' 
          : 'GOD'
  user.role = role
  return true
}

module.exports = handler