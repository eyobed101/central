import React from 'react'
import OddCalculator from '../OddCalculator'

//fetch shop_ID total income, current ballance

const shopDetails = []
// Generate 100 sample objects
for (let i = 0; i < 100; i++) {
  //let totalIncomeInWeek = 0;
  const shop = {
    shop_ID: i, // Increment the shop_ID starting from 5
    totalIncomeInWeek: Math.floor(Math.random() * 5000) + 1000, // Generate a random total income between 1000 and 6000
    currntBalance: Math.floor(Math.random() * 100) + 1000, // Generate a random current balance between 100 and 1100
    //currntBalance: totalIncomeInWeek, // Generate a random current balance between 100 and 1100
  }

  shopDetails.push(shop) // Insert the sample object into the array
}

//console.log(shopDetails) // Output the updated array with 100 sample objects

var positiveBalancedShop = []
var negativeBalancedShop = []

//add currentBalancePersentage for every shop
const shopWithCurrentBalancePersentage = shopDetails.map((obj) => {
  return {
    ...obj,
    currentBalancePersentage: (obj.currntBalance / obj.totalIncomeInWeek) * 100,
    timeInNegative: 172800,
  }
})

//decending order
shopWithCurrentBalancePersentage.sort(
  (a, b) => b.currentBalancePersentage - a.currentBalancePersentage
)
console.log(
  'shopWithCurrentBalancePersentage ',
  shopWithCurrentBalancePersentage
)

//shop status based on days of week
function getCurrentDayOfWeek() {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const today = new Date()
  const currentDayOfWeek = today.getDay()

  return daysOfWeek[currentDayOfWeek]
}

function percentageAssigner() {
  var shopNumerAssigner = 20
  if (getCurrentDayOfWeek() === 'Sunday') {
    shopNumerAssigner = 20
  } else if (getCurrentDayOfWeek() === 'Monday') {
    shopNumerAssigner = 20
  } else if (getCurrentDayOfWeek() === 'Tuesday') {
    shopNumerAssigner = 20
  } else if (getCurrentDayOfWeek() === 'Wednesday') {
    shopNumerAssigner = 18
  } else if (getCurrentDayOfWeek() === 'Thursday') {
    shopNumerAssigner = 15
  } else if (getCurrentDayOfWeek() === 'Friday') {
    shopNumerAssigner = 10
  } else if (getCurrentDayOfWeek() === 'Saturday') {
    shopNumerAssigner = 5
  } else {
    shopNumerAssigner = 20
  }
  return shopNumerAssigner
}
console.log(percentageAssigner())
console.log(getCurrentDayOfWeek())
// calculate shop status and push to array
function calcShopStatus() {
  shopWithCurrentBalancePersentage.forEach((obj) => {
    if (obj.currentBalancePersentage < percentageAssigner()) {
      negativeBalancedShop.push(obj)
    } else {
      positiveBalancedShop.push(obj)
    }
  })
  console.log('positive ', positiveBalancedShop)
  console.log('negative ', negativeBalancedShop)
}
calcShopStatus()

positiveBalancedShop.sort(
  (a, b) => b.currentBalancePersentage - a.currentBalancePersentage
)

negativeBalancedShop.sort(
  (a, b) => a.currentBalancePersentage - b.currentBalancePersentage
)

/************************************* PROCESS 2 *************************************** */

//var luckyNumber = [];
var luckyNumber = []
var firstIteration = []
var secondIteration = []
var thirdIteration = []
var firstIterationLoss = 0
var secondIterationLoss = 0
var thirdIterationLoss = 0

var allIterationLoss = []
var nearestElement = 0
var difference = 0
var currentDifference = 0

var totalNumberOfShop = shopDetails.length
var totalMoneyForJackpot = 0
var totalMoneyForGain = 0
if (negativeBalancedShop.length >= totalNumberOfShop * 0.2) {
  //call positive process
  //take 50% of shop

  const selectedShopsCount = Math.ceil(negativeBalancedShop.length * 0.5)
  const selectedShops = []
  //first push shops with long time in negative to selected shop
  for (let i = 0; i <= negativeBalancedShop.length; i++) {
    if (negativeBalancedShop[i].timeInNegative >= 172800) {
      selectedShops.push(negativeBalancedShop[i])
      if (selectedShops.length >= selectedShopsCount * 0.5) {
        break
      }
    }
  }
  //then add another element from negative array to selected shop
  for (let i = selectedShops.length; i <= selectedShopsCount; i++) {
    selectedShops.push(negativeBalancedShop[i - selectedShops.length])
  }

  //consider time in negative array
  console.log('Selected negative Shops:', selectedShops)

  //next game gain have to be around 20% totalInComeInweek

  //above 20% is for jackpot
  const assignForGain = selectedShops.map((obj) => {
    return {
      ...obj,
      forGain: obj.totalIncomeInWeek * 0.2 - obj.currntBalance,
    }
  })
  console.log('shop with forGain value ', assignForGain)
  //take the avarage currentBalancePersentage of selectedShops

  totalMoneyForGain = assignForGain.reduce((sum, obj) => sum + obj.forGain, 0)
  console.log('total money for gain', totalMoneyForGain)
} else {
  //call negative process
  //take 50% of shop
  const selectedShopsCount = Math.ceil(positiveBalancedShop.length * 0.5)
  const selectedShops = positiveBalancedShop.slice(0, selectedShopsCount)
  console.log('Selected positive Shops:', selectedShops)

  // calculate money for jackpot

  //above 20% is for jackpot
  const assignForJackpot = selectedShops.map((obj) => {
    return {
      ...obj,
      forJackpot: obj.totalIncomeInWeek - obj.totalIncomeInWeek * 0.2,
    }
  })
  console.log(assignForJackpot)
  //take the avarage currentBalancePersentage of selectedShops

  totalMoneyForJackpot = assignForJackpot.reduce(
    (sum, obj) => sum + obj.forJackpot,
    0
  )
  console.log('total money for jackpot', totalMoneyForJackpot)
}

//note:- the jackpot must be under jackpot

//go to selected tickets
//consider tickets only come from selected shop

const selectedTickets = []
const allSelectedNumbers = []
var ticket = []
for (let i = 1; i <= 500; i++) {
  ticket = {
    ticket_ID: i,
    shop_ID: Math.floor(Math.random() * 100) + 1, // Generate random shop ID between 1 and 100
    selectedNumbers: [],
    money: 20,
  }

  // Generate 5 random numbers and add them to the selectedNumbers array
  for (let j = 0; j < 5; j++) {
    const randomNumber = Math.floor(Math.random() * 80) + 1 // Generate random number between 1 and 80
    ticket.selectedNumbers.push(randomNumber)
    allSelectedNumbers.push(ticket.selectedNumbers[j])
  }
  selectedTickets.push(ticket)
}

console.log('all selected tickets ', selectedTickets)
console.log(allSelectedNumbers)

//check if there is unSelectedNmbers
const unSelectedNmbers = []
for (let i = 1; i <= 80; i++) {
  if (!allSelectedNumbers.includes(i)) {
    unSelectedNmbers.push(i)
  }
}
console.log('un selected Numbers:', unSelectedNmbers)

// Count the frequency of each number
const frequencyMap = allSelectedNumbers.reduce((map, number) => {
  map[number] = (map[number] || 0) + 1
  return map
}, {})

// Sort the numbers based on their frequency in descending order
const sortedNumbers = Object.keys(frequencyMap).sort(
  (a, b) => frequencyMap[b] - frequencyMap[a]
)

console.log('Sorted numbers based on repetition:', sortedNumbers)

//push numbers to luckyNumbers array

luckyNumber = [sortedNumbers[0], sortedNumbers[1]]
//luckyNumber = [sortedNumbers[0], sortedNumbers[1]];
// for (let i = 1; i <= 80; i++) {
//   luckyNumber.push(i);
// }
let luc = luckyNumber.map((str) => parseInt(str))
luc = Array.from(luc)

//now calculate ODD for every ticket

function getMatchingNumbers(luck, ticket) {
  let count = 0
  let luc = luck.map((str) => parseInt(str))
  for (let i = 0; i < ticket.selectedNumbers.length; i++) {
    if (luc.includes(ticket.selectedNumbers[i])) {
      count++
    }
  }
  return count
}
var totalMoneyLoss = 0
var moneyForLuckyTicket = 0
function GetTotalMoneyLossForWinner() {
  totalMoneyLoss = 0
  for (let i = 0; i < selectedTickets.length; i++) {
    //const ticket = selectedTickets[i]

    const matchingNumbers = getMatchingNumbers(selectedTickets[i])
    //moneyForLuckyTicket = selectedTickets[i].money;

    const odd = OddCalculator(
      selectedTickets[i].selectedNumbers.length,
      matchingNumbers
    )
    if (odd > 0) {
      moneyForLuckyTicket = odd * selectedTickets[i].money
    }
    totalMoneyLoss = moneyForLuckyTicket + totalMoneyLoss
  }

  return totalMoneyLoss
}

function GetTotalMoneyLossForWinners(luck) {
  totalMoneyLoss = 0
  for (let i = 0; i < selectedTickets.length; i++) {
    //const ticket = selectedTickets[i]
    const matchingNumbers = getMatchingNumbers(luck, selectedTickets[i])
    //moneyForLuckyTicket = selectedTickets[i].money;

    const odd = OddCalculator(
      selectedTickets[i].selectedNumbers.length,
      matchingNumbers
    )
    if (odd > 0) {
      moneyForLuckyTicket = odd * selectedTickets[i].money
    }
    totalMoneyLoss = moneyForLuckyTicket + totalMoneyLoss
  }

  return totalMoneyLoss
}
//console.log('total money loss ', GetTotalMoneyLossForWinners())
/************************START PROCESS FOR LOSS MONEY****************************/
var finalLuckyNumber = []
var iteratedLuckyNumbers = {}

//check if loss between 90% and 110% of totalMoneyForJackpot
function ForLoss() {
  if (totalMoneyForJackpot * 0.9 <= totalMoneyLoss <= totalMoneyForJackpot) {
    //good jackpot so lets add luckyNumber from unselected or less frequently numbers
    //if unselected numbers are available
    if (unSelectedNmbers.length > 0) {
      //cadd element to luckyNumber untill 20
      for (let i = 0; i < unSelectedNmbers.length; i++) {
        luckyNumber.push(unSelectedNmbers[i])
        if (luckyNumber.length >= 20) {
          break
        }
      }
      finalLuckyNumber = luckyNumber
      //here if luckyNumber.length ===20, luckyNumber === finalLuckyNumber
    } else {
      //or add element from less frequented numbers from sortedNumbers
      luckyNumber.splice(
        0,
        luckyNumber.length,
        sortedNumbers[0],
        sortedNumbers[1]
      )

      //or add element from less frequented numbers from sortedNumbers
      for (let i = sortedNumbers.length - 1; i >= 0; i--) {
        luckyNumber.push(sortedNumbers[i])
        if (luckyNumber.length >= 20) {
          break
        }
      }
      firstIteration = new Set(luckyNumber)
      //calculate first iteration ODD
      firstIterationLoss = GetTotalMoneyLossForWinners([...firstIteration])
      console.log('first iteration loss', firstIterationLoss)
      iteratedLuckyNumbers[firstIterationLoss] = luckyNumber
      console.log(iteratedLuckyNumbers)

      //doing 2nd Iteration
      luckyNumber.splice(
        0,
        luckyNumber.length,
        sortedNumbers[0],
        sortedNumbers[1]
      )
      for (let i = sortedNumbers.length - 5; i >= 0; i--) {
        luckyNumber.push(sortedNumbers[i])
        if (luckyNumber.length >= 20) {
          break
        }
      }

      secondIteration = new Set(luckyNumber)
      //calculate second iteration ODD
      console.log(secondIteration)
      let luc = [...secondIteration]
      secondIterationLoss = GetTotalMoneyLossForWinners([...secondIteration])
      console.log('second iteration loss ', secondIterationLoss)
      iteratedLuckyNumbers[secondIterationLoss] = luckyNumber
      console.log(iteratedLuckyNumbers)

      //doing 3rd iteration
      luckyNumber.splice(
        0,
        luckyNumber.length,
        sortedNumbers[0],
        sortedNumbers[1]
      )
      for (let i = sortedNumbers.length - 10; i >= 0; i--) {
        luckyNumber.push(sortedNumbers[i])
        if (luckyNumber.length >= 20) {
          break
        }
      }
      thirdIteration = new Set(luckyNumber)
      //calculate third iteration ODD
      thirdIterationLoss = GetTotalMoneyLossForWinners([...thirdIteration])
      console.log('thired iteration loss ', thirdIterationLoss)
      iteratedLuckyNumbers[thirdIterationLoss] = luckyNumber
      console.log(iteratedLuckyNumbers)
    }
    console.log([firstIteration, secondIteration, thirdIteration])
    console.log(iteratedLuckyNumbers[thirdIterationLoss])
    //calculate odd and money with 3 iteration and save money loss with each iteration

    //choose calculate nearest posible combination then return
    allIterationLoss = [
      firstIterationLoss,
      secondIterationLoss,
      thirdIterationLoss,
    ]

    nearestElement = firstIterationLoss
    difference = Math.abs(totalMoneyForJackpot - nearestElement)

    for (let i = 1; i < allIterationLoss.length; i++) {
      currentDifference = Math.abs(totalMoneyForJackpot - allIterationLoss[i])
      if (currentDifference < difference) {
        nearestElement = allIterationLoss[i]
        difference = currentDifference
      }
    }
    /*????we can add iteration with out 2 most frequented numbers?????????????????????????????*/

    console.log(`Nearest loss to ${totalMoneyForJackpot} is  ${nearestElement}`)
    console.log(
      `final lucky numbers are  ${iteratedLuckyNumbers[nearestElement]}`
    )
    //??????????????make  nearest elements luckyNumbers finalLuckyNumbers
  } else if (totalMoneyLoss >= totalMoneyForJackpot) {
    //it means loss much money so remove frequently numbers from luckyNumbers
    //remove 2 frequented numbers
    luckyNumber.shift()
    luckyNumber.shift()
    //then lets add luckyNumber from unselected or less frequently numbers
    //if unselected numbers are available
    if (unSelectedNmbers.length > 0) {
      //cadd element to luckyNumber untill 20
      for (let i = 0; i < unSelectedNmbers.length; i++) {
        luckyNumber.push(unSelectedNmbers[i])
        if (luckyNumber.length >= 20) {
          break
        }
      }
      finalLuckyNumber = luckyNumber //if odd result are near to totalMoneyForJackpot
    } else {
      //or add element from less frequented numbers from sortedNumbers
      luckyNumber.splice(0, luckyNumber.length)
      //or add element from less frequented numbers from sortedNumbers
      for (let i = sortedNumbers.length - 1; i >= 0; i--) {
        luckyNumber.push(sortedNumbers[i])
        if (luckyNumber.length >= 20) {
          break
        }
      }
      firstIteration = new Set(luckyNumber)
      //calculate first iteration ODD
      firstIterationLoss = GetTotalMoneyLossForWinners([...firstIteration])
      console.log('first iteration loss', firstIterationLoss)
      iteratedLuckyNumbers[firstIterationLoss] = luckyNumber
      console.log(iteratedLuckyNumbers)

      //doing 2nd Iteration
      luckyNumber.splice(0, luckyNumber.length)
      for (let i = sortedNumbers.length - 5; i >= 0; i--) {
        luckyNumber.push(sortedNumbers[i])
        if (luckyNumber.length >= 20) {
          break
        }
      }
      secondIteration = new Set(luckyNumber)

      //calculate second iteration ODD
      secondIterationLoss = GetTotalMoneyLossForWinners([...secondIteration])
      console.log('second iteration loss', secondIterationLoss)
      iteratedLuckyNumbers[secondIterationLoss] = luckyNumber
      console.log(iteratedLuckyNumbers)

      //doing 3rd iteration
      luckyNumber.splice(0, luckyNumber.length)
      for (let i = sortedNumbers.length - 10; i >= 0; i--) {
        luckyNumber.push(sortedNumbers[i])
        if (luckyNumber.length >= 20) {
          break
        }
      }
      thirdIteration = new Set(luckyNumber)
      //calculate third iteration ODD
      thirdIterationLoss = GetTotalMoneyLossForWinners([...thirdIteration])
      console.log('third iteration loss', thirdIterationLoss)
      iteratedLuckyNumbers[thirdIterationLoss] = luckyNumber
      console.log(iteratedLuckyNumbers)
    }
    console.log([firstIteration, secondIteration, thirdIteration])
    //calculate odd and money with 3 iteration and save money loss with each iteration

    //choose calculate nearest posible combination then return
    allIterationLoss = [
      firstIterationLoss,
      secondIterationLoss,
      thirdIterationLoss,
    ]
    nearestElement = firstIterationLoss
    difference = Math.abs(totalMoneyLoss - nearestElement)

    for (let i = 1; i < allIterationLoss.length; i++) {
      currentDifference = Math.abs(totalMoneyLoss - allIterationLoss[i])
      if (currentDifference < difference) {
        nearestElement = allIterationLoss[i]
        difference = currentDifference
      }
    }

    console.log(`Nearest loss to ${totalMoneyLoss} is  ${nearestElement}`)
  } else {
    //at this condition not sure how to iterate???????????
    //it means loss less money so lets add luckyNumber from frequently numbers
    //add another 2 numbers from most frequented numbers from sortedNumbers
    luckyNumber.splice(
      0,
      luckyNumber.length,
      sortedNumbers[0],
      sortedNumbers[1]
    )
    for (let i = 2; i <= 3; i++) {
      luckyNumber.push(sortedNumbers[i])
      if (luckyNumber.length >= 20) {
        break
      }
    }
    if (luckyNumber.length > 20) {
      for (let i = sortedNumbers.length - 1; i >= 0; i--) {
        luckyNumber.push(sortedNumbers[i])
        if (luckyNumber.length >= 20) {
          break
        }
      }
    }
    //check luckyNumbers ODD is the nearest then make it finalLuckyNumber
    firstIteration = new Set(luckyNumber)
    //calculate first iteration ODD
    firstIterationLoss = GetTotalMoneyLossForWinners([...firstIteration])
    console.log(firstIterationLoss)
    console.log('current lucky numbers are ', luckyNumber)

    //doing 2nd Iteration
    luckyNumber.splice(0, luckyNumber.length)
    for (let i = sortedNumbers.length - 5; i >= 0; i--) {
      luckyNumber.push(sortedNumbers[i])
      if (luckyNumber.length >= 20) {
        break
      }
    }
    secondIteration = new Set(luckyNumber)
    //calculate second iteration ODD
    secondIterationLoss = GetTotalMoneyLossForWinners([...secondIteration])
    console.log(secondIteration)
    console.log('current lucky numbers are ', luckyNumber)

    //doing 3rd iteration
    for (let i = sortedNumbers.length - 10; i >= 0; i--) {
      luckyNumber.push(sortedNumbers[i])
      if (luckyNumber.length >= 20) {
        break
      }
    }
    thirdIteration = new Set(luckyNumber)
    //calculate third iteration ODD
    thirdIterationLoss = GetTotalMoneyLossForWinners([...thirdIteration])
    console.log(thirdIteration)
    console.log('current lucky numbers are ', luckyNumber)

    console.log([firstIteration, secondIteration, thirdIteration])
    //calculate odd and money with 3 iteration and save money loss with each iteration

    //choose calculate nearest posible combination then return
    allIterationLoss = [
      firstIterationLoss,
      secondIterationLoss,
      thirdIterationLoss,
    ]
    nearestElement = firstIterationLoss
    difference = Math.abs(totalMoneyLoss - nearestElement)

    for (let i = 1; i < allIterationLoss.length; i++) {
      currentDifference = Math.abs(totalMoneyLoss - allIterationLoss[i])
      if (currentDifference < difference) {
        nearestElement = allIterationLoss[i]
        difference = currentDifference
      }
    }

    console.log(`Nearest loss to ${totalMoneyLoss} is  ${nearestElement}`)
  }
  finalLuckyNumber = luckyNumber
  return finalLuckyNumber
}
ForLoss()
/************************END PROCESS FOR LOSS MONEY****************************/

/************************START PROCESS FOR GAIN MONEY****************************/
//put unselected numbers or list frequented.
function ForGain() {
  if (unSelectedNmbers.length > 0) {
    //add element to luckyNumber untill 20
    luckyNumber.splice(
      0,
      luckyNumber.length,
      sortedNumbers[0],
      sortedNumbers[1]
    )
    for (let i = 0; i < unSelectedNmbers.length; i++) {
      luckyNumber.push(unSelectedNmbers[i])
      if (luckyNumber.length >= 20) {
        break
      }
    }
    firstIteration = new Set(luckyNumber)
    //calculate first iteration ODD
    firstIterationLoss = GetTotalMoneyLossForWinners([...firstIteration])
    console.log(firstIterationLoss)
    console.log('current lucky numbers are ', luckyNumber)
    //doing2nd Iteration
    luckyNumber.splice(0, luckyNumber.length)
    for (let i = sortedNumbers.length - 5; i >= 0; i--) {
      luckyNumber.push(sortedNumbers[i])
      if (luckyNumber.length >= 20) {
        break
      }
    }
    secondIteration = new Set(luckyNumber)
    //calculate first iteration ODD
    secondIterationLoss = GetTotalMoneyLossForWinners([...secondIteration])
    console.log(secondIterationLoss)
    console.log('current lucky numbers are ', luckyNumber)
    //doing 3rd iteration
    luckyNumber.splice(0, luckyNumber.length)
    for (let i = sortedNumbers.length - 10; i >= 0; i--) {
      luckyNumber.push(sortedNumbers[i])
      if (luckyNumber.length >= 20) {
        break
      }
    }
    thirdIteration = new Set(luckyNumber)
    //calculate first iteration ODD
    thirdIterationLoss = GetTotalMoneyLossForWinners([...thirdIteration])
    console.log(thirdIterationLoss)
    console.log('current lucky numbers are ', luckyNumber)
    console.log([firstIteration, secondIteration, thirdIteration])
    //calculate odd and money with 3 iteration and save money loss with each iteration

    //choose calculate nearest posible combination then return
    allIterationLoss = [
      firstIterationLoss,
      secondIterationLoss,
      thirdIterationLoss,
    ]
    nearestElement = firstIterationLoss
    difference = Math.abs(totalMoneyForGain - nearestElement)

    for (let i = 1; i < allIterationLoss.length; i++) {
      currentDifference = Math.abs(totalMoneyForGain - allIterationLoss[i])
      if (currentDifference < difference) {
        nearestElement = allIterationLoss[i]
        difference = currentDifference
      }
    }

    console.log(`Nearest gain to ${totalMoneyForGain} is  ${nearestElement}`)
  } else {
    luckyNumber.splice(0, luckyNumber.length)
    //or add element from less frequented numbers from sortedNumbers
    for (let i = sortedNumbers.length - 1; i >= 0; i--) {
      luckyNumber.push(sortedNumbers[i])
      if (luckyNumber.length >= 20) {
        break
      }
    }
    firstIteration = new Set(luckyNumber)
    //calculate first iteration ODD
    firstIterationLoss = GetTotalMoneyLossForWinners([...firstIteration])
    console.log(firstIterationLoss)
    console.log('current lucky numbers are ', luckyNumber)
    //doing second Iteration
    luckyNumber.splice(0, luckyNumber.length)
    for (let i = sortedNumbers.length - 5; i >= 0; i--) {
      luckyNumber.push(sortedNumbers[i])
      if (luckyNumber.length >= 20) {
        break
      }
    }
    secondIteration = new Set(luckyNumber)
    //calculate second iteration ODD
    secondIterationLoss = GetTotalMoneyLossForWinners([...secondIteration])
    console.log(secondIterationLoss)
    console.log('current lucky numbers are ', luckyNumber)
    //doing third iteration
    luckyNumber.splice(0, luckyNumber.length)
    for (let i = sortedNumbers.length - 10; i >= 0; i--) {
      luckyNumber.push(sortedNumbers[i])
      if (luckyNumber.length >= 20) {
        break
      }
    }
    thirdIteration = new Set(luckyNumber)
    //calculate third iteration ODD
    thirdIterationLoss = GetTotalMoneyLossForWinners([...thirdIteration])
    console.log(thirdIterationLoss)
    console.log('current lucky numbers are ', luckyNumber)
    console.log([firstIteration, secondIteration, thirdIteration])
    //calculate odd and money with 3 iteration and save money loss with each iteration

    //choose calculate nearest posible combination then return
    allIterationLoss = [
      firstIterationLoss,
      secondIterationLoss,
      thirdIterationLoss,
    ]
    nearestElement = firstIterationLoss
    difference = Math.abs(totalMoneyForGain - nearestElement)

    for (let i = 1; i < allIterationLoss.length; i++) {
      currentDifference = Math.abs(totalMoneyForGain - allIterationLoss[i])
      if (currentDifference < difference) {
        nearestElement = allIterationLoss[i]
        difference = currentDifference
      }
    }

    console.log(`Nearest gain to ${totalMoneyForGain} is  ${nearestElement}`)
  }

  //return [firstIteration, secondIteration, thirdIteration]
}

ForGain()
// then calculate ODD for different numbers combinations
// compare different iterations ODD then take the most approximate numbers value to totalMoneyForGain.

/************************END PROCESS FOR GAIN MONEY****************************/

finalLuckyNumber = new Set(luckyNumber)
console.log('lucky numbers', finalLuckyNumber)
export default function App() {
  return (
    <div id='blockContainer' style={{ backgroundColor: 'gray' }}>
      hi
    </div>
  )
}
