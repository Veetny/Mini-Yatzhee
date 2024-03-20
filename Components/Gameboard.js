import { useEffect, useState } from 'react';
import { Text, View, Pressable } from 'react-native'
import Header from './Header';
import Footer from './Footer';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from '../constants/Game';
import { Container, Row, Col } from 'react-native-flex-grid';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style'

let board = [];

export default function Gameboard({ navigation, route }) {

  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('Throw dices');
  const [gameEndStatus, setGameEndStatus] = useState(false);

  const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));

  const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
  const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));

  const [playerName, setPlayerName] = useState('')

  const [totalPoints, setTotalPoints] = useState(0);
  const [roundNumber, setRoundNumber] = useState(0);

  const [bonusApplied, setBonusApplied] = useState(false);


  useEffect(() => {
    if (playerName === '' && route.params?.player){
      setPlayerName(route.params.player);
    }
  }, []);

  useEffect(() => {
    if (gameEndStatus) {
      resetDices();
    }
  }, [gameEndStatus]);


  const row = [];
  for (let dice = 0; dice < NBR_OF_DICES; dice++) {
      row.push(
          <Col key={"row" + dice}>
              <Pressable
                  key={"row" + dice}
              onPress={() => selectDice(dice)}
              >
                  <MaterialCommunityIcons
                      name={board[dice]}
                      key={"row" + dice}
                      size={50}
                      color={getDiceColor(dice)}
                  >
                  </MaterialCommunityIcons>
              </Pressable>
          </Col>
      );
  }
 
const pointsRow = [];
for (let spot = 0; spot < MAX_SPOT; spot++) {
  pointsRow.push(
    <Col key= {"pointsRow" + spot} style={styles.rows}>
      <Text key ={"pointsRow" + spot}>{getSpotTotal(spot)}</Text>
    </Col>
  )
}

const pointsToSelectRow = [];
for(let diceButton = 0; diceButton < MAX_SPOT; diceButton++){
  pointsToSelectRow.push(
<Col key={"buttonRow" + diceButton }>
<Pressable key={"buttonRow" + diceButton }
onPress={() => selectDicePoints(diceButton)}
>
  <MaterialCommunityIcons key={"buttonRow" + diceButton }
  name={"numeric-" + (diceButton + 1) + "-circle"}
  size={35}
  color={getDicePointsColor(diceButton)}
  >

  </MaterialCommunityIcons>
</Pressable>
</Col>

  )
}

  const selectDice = (i) => {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  }

  function getDiceColor(i){
    return selectedDices[i] ? "violet" : "lightblue"
  }

function getDicePointsColor(i) {
  return selectedDicePoints[i] ? "violet" : "lightblue"
}

const selectDicePoints = (i) => {
  if (nbrOfThrowsLeft === 0) {
      let selectedPoints = [...selectedDicePoints];
      let points = [...dicePointsTotal];
      if (!selectedPoints[i]) {
          selectedPoints[i] = true;
          let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
          points[i] = nbrOfDices * (i + 1);
          setSelectedDicePoints(selectedPoints);
          setDicePointsTotal(points);
          setNbrOfThrowsLeft(NBR_OF_THROWS);

 
          let roundTotal = totalPoints + points[i];
          if (roundTotal >= BONUS_POINTS_LIMIT && !bonusApplied) {

              roundTotal += BONUS_POINTS;
              setBonusApplied(true);
          }


          setTotalPoints(roundTotal);
          setRoundNumber(currentRound => currentRound + 1);
          setSelectedDices(new Array(NBR_OF_DICES).fill(false));

          if (roundNumber === 5) {
              setGameEndStatus(true);
          }

          return points[i];
      } else {
          setStatus('You already selected points for ' + (i + 1));
      }
  } else {
      setStatus("Throw " + NBR_OF_THROWS + " times before setting points.");
  }
}

  const throwDices = () => {
    console.log(totalPoints);
    console.log(BONUS_POINTS);
    console.log(dicePointsTotal);
    if (nbrOfThrowsLeft > 0) {
    let spots = [...diceSpots];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        if (!selectedDices[i]) {
            let randomNumber = Math.floor(Math.random() * MAX_SPOT + 1);
            spots[i] = randomNumber;
            board[i] = 'dice-' + randomNumber;
        }
    }
    setDiceSpots(spots);
    setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
}else{
  setStatus("Set points to proceed.");
}
}

function getSpotTotal(i) {
  return dicePointsTotal[i];
}

const resetGame = () => {
  setNbrOfThrowsLeft(NBR_OF_THROWS);
  setStatus('Throw dices');
  setGameEndStatus(false);
  setSelectedDices(new Array(NBR_OF_DICES).fill(false));
  setDiceSpots(new Array(NBR_OF_DICES).fill(0));
  setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
  setDicePointsTotal(new Array(MAX_SPOT).fill(0));
  setTotalPoints(0);
  setRoundNumber(0);
  setBonusApplied(false);
}

const resetDices = () => {
  board = [];
  setDiceSpots(new Array(NBR_OF_DICES).fill(0));
};

const remainingPointsForBonus = BONUS_POINTS_LIMIT - totalPoints;
const displayBonusCounter = remainingPointsForBonus > 0;

  return (
    <>
      <Header />
      {!gameEndStatus ?
        <>
          <View>
            
              <>
                <View></View>
              </>
              
              <>
                <Container>

                  <Row>{row}</Row>

                </Container>
              </>
            
            <Text style={styles.rulesText}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={styles.rulesText}>{status}</Text>
            <View style={styles.rulesText}>
              <Text style={styles.Enlarge}>Total Points: {totalPoints}</Text></View>
            {displayBonusCounter &&
              <Text style={styles.rulesText}>Points to Bonus: {remainingPointsForBonus}</Text>}
            <Pressable style={styles.buttons} onPress={() => throwDices()}>
              <Text>THROW DICES</Text>
            </Pressable>
            <Container>
              <Row>{pointsRow}</Row>
            </Container>
            <Container>
              <Row>{pointsToSelectRow}</Row>
            </Container>
            <Text style={styles.rulesText}>Player name: {playerName}</Text>
          </View>

        </>
        :
        <>
          <View>
            <Text style={styles.rulesText}>Game over. You can play again by resetting the game.</Text>
            <Text style={styles.rulesText}>Player name: {playerName}</Text>
            <Text style={styles.rulesText}>Total Points: {totalPoints}</Text>
            <Pressable style={styles.buttons} onPress={() => resetGame()}>
              <Text>Reset Game</Text>
            </Pressable>

          </View>
        </>
      }
      <Footer />
    </>


  )
}