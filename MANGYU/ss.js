const reversedNum = (num) =>{
  return (
    parseFloat(
      num
        .toString() //숫자를 문자열로 변환
        .split('') //문자열을 배열로 변환
        .reverse() //배열을 거꾸로 뒤집기
        .join('') //배열 원소를 문자열로 합치기
    ) * Math.sign(num) //음수인지 확인  
  )                 
}

console.log(reversedNum(-1234-0))