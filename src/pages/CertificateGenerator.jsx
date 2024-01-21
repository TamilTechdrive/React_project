import { useReducer, useState } from 'react';
import styles from '../assets/styles/certificateGenerator.module.scss';
import Modal from '../components/Modal';
import Certificate from '../view/Certificate';


const initialState = {
  name: 'ZOHO',
  Position: 'Software Developer',
  dateOfConductStart: '2003-01-25',
  dateOfConductEnd: '2003-01-25',
  CompanyLogo: '',
  CompanyDetails: 'CEO, Sridhar Vembu',
  backgroundImg: '',
  batch: '2024',
  salary: '6 LPA',
  experience: 'Freshers',
  degree: 'B.E',
  Heading:'NOVA JOB UPDATES'
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TEXT_CHANGE':
      return { ...state, [action.field]: action.payload };
    default:
      return state;
  }
};

const CertificateGenerator = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formState, dispatch] = useReducer(reducer, initialState);


  const handleSubmitForm = (e) => {
    e.preventDefault();
    const { name, Position, dateOfConductStart, dateOfConductEnd, CompanyLogo, CompanyDetails, backgroundImg, batch, salary, experience, degree ,Heading } = formState;

    if (name && Position && dateOfConductStart && dateOfConductEnd && CompanyLogo && CompanyDetails && backgroundImg && batch && salary && experience && degree && Heading) {
      console.log('🔥💻 Form submitted!!!', formState);
      setIsOpenModal(true);
    } else {
      alert('Please fill in all details');
    }
  };

  const handleTextChange = (e) => {
    dispatch({ type: 'TEXT_CHANGE', field: e.target.name, payload: e.target.value });
  };

  const handleFileChange = (e, fieldName) => {
    const selected = e.target.files[0];

    if (selected) {
      const objectUrl = URL.createObjectURL(selected);
      dispatch({ type: 'TEXT_CHANGE', field: fieldName, payload: { ...selected, preview: objectUrl } });
    }
  };


  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <form onSubmit={handleSubmitForm}>
        <div className={styles.inputGroup}>
         <label htmlFor='Heading'>Heading</label>
         <input type='text' name='Heading' autoComplete='on' value={formState.Heading} onChange={handleTextChange} id='Heading' />
        </div>
        <div className={styles.inputGroup}>
         <label htmlFor='name'>Company Name</label>
         <input type='text' name='name' autoComplete='on' value={formState.name} onChange={handleTextChange} id='name' />
        </div>
       
       <div className={styles.inputGroup}>
         <label htmlFor='Position'>Position</label>
         <input type='text' name='Position' value={formState.Position} onChange={handleTextChange} id='Position' />
       </div>
       
       <div className={styles.inputGroup}>
         <label htmlFor='dateOfConductStart'>Date of Conduct - Start</label>
         <input
           type='date'
           value={formState.dateOfConductStart}
           onChange={handleTextChange}
           name='dateOfConductStart'
           id='dateOfConductStart'
         />
       </div>
       
       <div className={styles.inputGroup}>
         <label htmlFor='dateOfConductEnd'>Date of Conduct - End</label>
         <input
           type='date'
           value={formState.dateOfConductEnd}
           onChange={handleTextChange}
           name='dateOfConductEnd'
           id='dateOfConductEnd'
         />
       </div>
       
       <div className={styles.inputGroup}>
         <label htmlFor='CompanyLogo'>Company Logo</label>
         <input
           type='file'
           name='CompanyLogo'
           id='CompanyLogo'
           accept='image/*' // accept only image files
           onChange={(e) => handleFileChange(e, 'CompanyLogo')}
         />
       </div>
       
       <div className={styles.inputGroup}>
         <label htmlFor='backgroundImg'>Background Image</label>
         <input
           type='file'
           name='backgroundImg'
           id='backgroundImg'
           accept='image/*' // accept only image files
           onChange={(e) => handleFileChange(e, 'backgroundImg')}
         />
       </div>
       
       <div className={styles.inputGroup}>
         <label htmlFor='CompanyDetails'>Company Details</label>
         <input
           type='text'
           name='CompanyDetails'
           value={formState.CompanyDetails}
           onChange={handleTextChange}
           id='CompanyDetails'
         />
       </div>
       
       <div className={styles.inputGroup}>
         <label htmlFor='batch'>Batch</label>
         <input type='text' name='batch' value={formState.batch} onChange={handleTextChange} id='batch' />
       </div>
       
       <div className={styles.inputGroup}>
         <label htmlFor='salary'>Salary</label>
         <input type='text' name='salary' value={formState.salary} onChange={handleTextChange} id='salary' />
       </div>
       
       <div className={styles.inputGroup}>
         <label htmlFor='experience'>Experience</label>
         <input type='text' name='experience' value={formState.experience} onChange={handleTextChange} id='experience' />
       </div>
       
       <div className={styles.inputGroup}>
         <label htmlFor='degree'>Degree</label>
         <input type='text' name='degree' value={formState.degree} onChange={handleTextChange} id='degree' />
       </div>
       
       
       
            <button type='submit'>Generate</button>
          </form>
        </div>
      </div>
     


      <Modal isOpen={isOpenModal} handleClose={() => setIsOpenModal(false)}>
        <Certificate {...formState} />
      </Modal>
    </>
  );
};

export default CertificateGenerator;









