import { createContext, useContext, useState, useEffect } from "react";
import { Neurosity } from "@neurosity/sdk";

const NeurosityContext = createContext();

export const useNeurosity = () => useContext(NeurosityContext);

export const NeurosityProvider = ({ children }) => {
  const [neurosity, setNeurosity] = useState(null);
  const [user, setUser] = useState(null);

  const deviceId = import.meta.env.VITE_DEVICE_ID;

  useEffect(() => {
    if (deviceId) {
      const neurosityDevice = new Neurosity({ deviceId });
      setNeurosity(neurosityDevice);
    }
  }, [deviceId]);

  useEffect(() => {
    const email = import.meta.env.VITE_EMAIL;
    const password = import.meta.env.VITE_PASSWORD;

    if (!user && neurosity && email && password) {
      login();
    }

    async function login() {
      const auth = await neurosity.login({ email, password }).catch((error) => {
        console.error(error);
      });

      if (auth) {
        setUser(auth.user);
      }
    }
  }, [neurosity]);

  return (
    <NeurosityContext.Provider value={{ neurosity, user }}>
      {children}
    </NeurosityContext.Provider>
  );
};
