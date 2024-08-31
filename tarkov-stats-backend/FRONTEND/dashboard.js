// DashboardScreen.js
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

export default function DashboardScreen({ route }) {
  const [stats, setStats] = useState({ kdRatio: '--', otherStat: '--' });
  const { token } = route.params;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://your-server-ip:5000/api/stats', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setStats(res.data.stats);
      } catch (error) {
        console.log('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>K/D Ratio: {stats.kdRatio}</Text>
      <Text>Other Stat: {stats.otherStat}</Text>
    </View>
  );
}
