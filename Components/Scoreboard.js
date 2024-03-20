import React from 'react'
import { Text, View } from 'react-native'
import styles from '../style/style'

export default function Scoreboard() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        Scoreboard went to the store for milk. :C
      </Text>
    </View>
  )
}