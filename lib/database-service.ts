import { Alert } from "react-native";
import { useEffect, useState } from "react";

function handleAsyncDbFunction<T>(callback: (...args: T[]) => Promise<any>, ...inputs: any[]): any {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await callback(...inputs);
      setData(res);
    } catch (error) {
      Alert.alert("Error", String(error));    
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, refetch };
};

export default handleAsyncDbFunction;