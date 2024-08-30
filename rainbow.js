function calculateRainbowNumber() {
    let birthdate = document.getElementById('birthdate').value;
    if (!birthdate) {
        document.getElementById('result').textContent = "请输入有效的出生日期";
        return;
    }
    // 将日期分解为年、月、日
    let [year, month, day] = birthdate.split('-').map(Number);
    const birthdate1 = `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`;

    // 使用Lunar.js将阳历转换为阴历
    let lunar = Solar.fromYmd(year, month, day).getLunar();

    let lunarYear = lunar.getYear();
    let lunarMonth = lunar.getMonth();
    let lunarDay = lunar.getDay();
    const lunarBirthdate = `${lunarYear}/${String(lunarMonth).padStart(2, '0')}/${String(lunarDay).padStart(2, '0')}`;


       // 阳历彩虹数字计算
       let solarSum = calculateSum(birthdate);
       let solarRainbowNumber = formatRainbowNumber(solarSum);
   
       // 阴历彩虹数字计算
       let lunarSum = calculateSum(`${lunarYear}${lunarMonth}${lunarDay}`);
       let lunarRainbowNumber = formatRainbowNumber(lunarSum);
   
       document.getElementById('result').innerHTML = 
       `阳历生日：${birthdate1}，彩虹数字：+${solarRainbowNumber}<br>` + 
       `阴历生日：${lunarBirthdate}，彩虹数字：-${lunarRainbowNumber}`;   }
   
function calculateSum(dateString) {
    let digits = dateString.replace(/-/g, '').split('');
    return digits.reduce((acc, digit) => acc + parseInt(digit), 0);
}

function formatRainbowNumber(num) {
    // 计算第一次的和
    let firstSum = num;
    
    // 如果和是两位数，继续简化
    let intermediateSum = reduceToTwoDigits(firstSum);
    
    // 计算最终的单一位数字
    let finalSum = reduceToSingleDigit(intermediateSum);
    
    // 根据情况决定显示的格式
    if (firstSum >= 10 && intermediateSum >= 10) {
        return `${firstSum}/${intermediateSum}/${finalSum}`;
    } else {
        return `${firstSum}/${finalSum}`;
    }
}

function reduceToTwoDigits(num) {
    if (num >= 10) {
        return num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return num; 
}

function reduceToSingleDigit(num) {
    while (num >= 10) {
        num = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return num;
}
