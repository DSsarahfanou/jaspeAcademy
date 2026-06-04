"use client"
import { useEffect, useState } from 'react';
import axios from '/src/lib/axios';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '/src/hooks/auth';
export default function VerifyEmail() {

const router = useRouter();
const { user, register } = useAuth({
  middleware: 'guest',
});

const getRedirectPath = (role) => {
  const paths = {
    admin: '/dashboard/admin',
    teacher: '/dashboard/animateur',
    student: '/dashboard/apprenant',
  };
  return paths[role] || '/dashboard/apprenant';
};

useEffect(() => {
  if (user?.role) {
    alert(user.role);
    router.push(getRedirectPath(user.role));
  }
}, [user]);

  const [data, setData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("formData");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);


  const [errors, setErrors] = useState({});      
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');



  // Envoyer le code par email
  // const sendCode = async () => {
  //   console.log(data.email);
  //   setEmail(data.email);
  //   console.log("l'email après setEMAIL");
  //   console.log(email);
  //   await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
  //   try {
  //     const res = await axios.post(
  //       '/api/send-2fa-code',
  //       {email}, // JSON simple
  //       {
  //         withCredentials: true, // pas besoin de header spécial
  //       }
  //     );
  //     // const res = await axios.post('send-2fa-code', { email });
  //     setMessage(res.data.message);
  //     console.log(res.data.message);
  //   } catch (err) {
  //     console.error(err);
  //     setMessage('Erreur lors de l’envoi du code');
  //   }
  // };


  // Envoyer le code par email
const sendCode = async () => {

  setEmail(data.email);

  await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
  try {
    const res = await axios.post(
      '/api/send-2fa-code',
      { email: data.email }, // ✅ toujours utiliser data.email ici
      { withCredentials: true }
    );

    setMessage(res.data.message);

  } catch (err) {
    console.error(err);
    setMessage("Erreur lors de l’envoi du code");
  }
};


  // Vérifier le code
  const verifyCode = async () => {
    await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
    try {
      // const res = await axios.post('api/verify-2fa-code', { email, code },        
      //   {
      //     withCredentials: true, // pas besoin de header spécial
      //   });
      
      const res =  await axios.post('/api/verify-2fa-code', { email, code }, { withCredentials: true });
      setMessage(res.data.message);

      if (res.data.status === 'success') {
        // Redirection après succès
          const response = await register({ 
            data: data,
            setErrors: (errs) => setErrors(errs)
          }); 

          // Stockez le token dans localStorage
          localStorage.setItem('token', response.token);

      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Erreur de vérification');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Vérification Email</h1>

      <input
        type="email"
        placeholder="Votre email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <button onClick={sendCode} className="w-full mb-4 p-2 bg-blue-600 text-white rounded">
        Envoyer le code
      </button>

      <input
        type="text"
        placeholder="Code reçu"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <button onClick={verifyCode} className="w-full p-2 bg-green-600 text-white rounded">
        Vérifier le code
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
