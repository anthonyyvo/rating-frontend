import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import './questions.scss'
import { QuestionsContext } from '../../../context/questionsContext/Context';
import { LoginContext } from '../../../context/loginContext/Context';
const Questions = () => {
    const [quesActive, setQuesActive] = useState(1);
    const {state, dispatch, handleSendData} = useContext(QuestionsContext);
    const [quesData, setQuesData] = useState([]);
    const [currentQues, setCurrentQues] = useState({});
    // Options if question have
    const [options, setOptions] = useState([])
    const [engOptions, setEngOptions] = useState([]);
    const PF = process.env.REACT_APP_SERVER + "/questions/";
    const {user} = useContext(LoginContext);
    const [isNew, setIsNew] = useState(false)

    // Make new array as options & Eng options when change any input value
    const handleOption = (e, index) => {
        setOptions(prev => prev.map((item,i)=> {
            if (i === index) {
                return e.target.value;
            } else {
                return item;
            }
        }));
    }
    const handleEngOption = (e, index) => {
        setEngOptions(prev => prev.map((item,i)=> {
            if (i === index) {
                return e.target.value;
            } else {
                return item;
            }
        }))
    };
    const handleDelete = async (id) => {
        try {
            const deleted = await axios.delete(PF + id,{
                data: {
                    username: user.username
                }
            });
            console.log(deleted);
        } catch (err) {
            console.log(err)
        }
    }
    const handleSubmit = async (e) => {
        if (isNew) {
            e.preventDefault();
            const newQuestion = options ? {...currentQues, options: options, optionsEng: engOptions} : {...currentQues};
            console.log(newQuestion);
            try {
                const postQuestion = await axios.post(PF, {
                    ...newQuestion,
                    username: user.username
                });
                console.log(postQuestion)
            } catch (err) {
                console.log(err)
            }

        } else {
            const updateQuestion = {...currentQues, options: options, optionsEng: engOptions};
    
            try {
                await axios.put(PF + updateQuestion._id, {
                    ...updateQuestion,
                    username: user.username
                })
            } catch (err) {
                console.log(err)
            }
        }
    }
// Fetch data from server and set quesData as Array and set current question
  useEffect(() => {
    const data = {
      name: "satisfied"
    }
    const questions = async (data) => {
        const questionsData =  await handleSendData(data);
        setQuesData(questionsData)
        setCurrentQues(questionsData[quesActive]);
        setOptions(questionsData[quesActive]?.options);
        setEngOptions(questionsData[quesActive]?.optionsEng);
    }
    questions(data)
  }, []);
// Change current question whenever quesActive change when user click sidebar tab
  useEffect(()=> {
    setEngOptions([]);
    setOptions([]);
    setCurrentQues(quesData[quesActive]);
    if (quesData[quesActive]?.options[0]) {
        setOptions(quesData[quesActive]?.options);
        setEngOptions(quesData[quesActive]?.optionsEng);
    } else {
        setOptions([]);
        setEngOptions([])
    }
  }, [quesActive])
  useEffect(()=> {
    if (isNew) {
        setCurrentQues([]);
        setOptions([]);
        setEngOptions([])
    }
  }, [isNew])
 
  return (
     <div className='questions'>
          <Sidebar />
      <div className='questionsContainer'>
          <Navbar />
          <div className='flex w-full text-gray-600 '>
                <div className='m-6 w-full flex border-solid border-[0.5px] border-sky-500 justify-center flex-wrap'>
                    <div className='w-1/4 h-[30px] border-[0.5px] border-solid border-sky-500 text-center'>Questions</div>
                    <div className='w-3/4 h-[30px] border-[0.5px] border-solid border-sky-500 text-center'>Settings</div>
                    {/* button question */}
                    <div className='w-1/4 p-2 border-[0.5px] border-solid border-sky-500 flex flex-col items-center'>
                        <button onClick={()=>{setIsNew(true); setQuesActive(null)}}
                        className='px-4 py-2 rounded bg-green-500 text-white'>NEW QUESTION</button>

                        <ul className='flex flex-col items-start mt-3 w-full'>
                            {
                                quesData.map((ques, i) => (
                                    <li key={(i)} onClick={e => {setQuesActive(i); setIsNew(false)}}
                                        className={`${quesActive === i ? 'bg-gray-200 border-solid border-l-4 border-green-400' :''} p-2 mb-1 w-full cursor-pointer hover:bg-gray-200 border-l-4 border-solid border-white hover:border-green-500 ease-in-out duration-300`} 
                                     >
                                {quesData[i]?.name}
                                </li>
                                ))
                            }
                   
                        </ul>
                    
                    </div>
                    {/* Question  */}
                    <div className='w-3/4 border-[0.5px] border-solid border-sky-500 p-4 gap-4'>
                    <h2 className='mb-4 text-center text-xl font-bold uppercase'>{currentQues?.name}</h2> 
                    <button className='bg-red-300 text-white p-2 rounded' onClick={()=>{handleDelete(currentQues._id)}}>DELETE</button>

                    <div className='flex gap-4'>
                        <div className='flex-1 flex flex-col bg-sky-100 p-4 rounded'>
                            {isNew ? (
                                <div className='w-full mb-4'>
                                <label className='w-full mb-2 block text-black font-bold'>NAME OF QUESTION</label>
                                <input className='w-full border border-solid border-gray-200 focus:border-sky-400
                                rounded p-2 outline-none transition font-medium
                                ' type="text" placeholder='Your question' value={currentQues?.name || ""} onChange={(e)=> setCurrentQues(
                                    {...currentQues, name: e.target.value}
                                ) }>
                                </input>
                            </div>
                            ) :
                            ''
                            }
                            <div className='w-full mb-4'>
                                <label className='w-full mb-2 block text-black font-bold'>QUESTION (VI)</label>
                                <input className='w-full border border-solid border-gray-200 focus:border-sky-400
                                rounded p-2 outline-none transition font-medium
                                ' type="text" placeholder='Your question' value={currentQues?.question || ""} onChange={(e)=> setCurrentQues(
                                    {...currentQues, question: e.target.value}
                                ) }>
                                </input>
                            </div>
                            <div className='w-full mb-4'>
                                <label className='w-full mb-2 block text-black font-bold'>QUESTION (ENG)</label>
                                <input className='w-full border border-solid border-gray-200 focus:border-sky-400
                                rounded p-2 outline-none transition font-medium
                                ' type="text" placeholder='Your question' value={currentQues?.questionEng || ""}
                                onChange={(e)=> setCurrentQues(
                                    {...currentQues, questionEng: e.target.value}
                                ) }
                                >
                                
                                </input>
                            </div>
                           
                            <button onClick={e => handleSubmit(e)} className='bg-green-500 px-4 py-2 text-white font-medium rounded'>
                                {isNew ? "CREATE QUESTION" : "UPDATE"}
                                </button>
                                
                        </div>

                        <div className='flex flex-1 flex-col bg-sky-100 p-4 rounded'>
                            <h2 className='mb-4 font-bold'>OPTIONS</h2>
                            {
                                options?.map((op, i) => 
                                    <div key={i} className='border-t border-solid border-sky-400 mb-4'>
                            <span className='block'>OPTION {i + 1}</span>
                                
                            <label className='w-full mb-2 block text-sm text-black'>(vi)</label>
                                <input className='w-full border border-solid border-gray-200 focus:border-sky-400
                                rounded p-1 outline-none transition font-medium
                                ' type="text" placeholder='Your vi option' value={options[i]}
                                onChange={(e) => handleOption(e, i)}
                                >
                                </input>
                                <label className='w-full mb-2 block text-sm text-black'>(eng)</label>
                                <input className='w-full border border-solid border-gray-200 focus:border-sky-400
                                rounded p-1 outline-none transition font-medium
                                ' type="text" placeholder='Your option' value={engOptions[i]}
                                onChange={e => handleEngOption(e, i)}
                                >
                                </input>
                            </div>
                                    )
                            }
                            <button onClick={()=>{setEngOptions(prev => [...prev,""]);setOptions(prev => [...prev, ""]); }}
                             className='bg-green-500 px-4 py-2 rounded text-white'>+ Option</button>
                    
                            
                        </div>
                    </div>
                    </div>
                </div>                  
          </div>
      </div>
    </div>
  )
}

export default Questions;