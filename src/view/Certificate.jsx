import moment from 'moment';
import styles from '../assets/styles/certificateGenerator.module.scss';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';
import Insta from '../components/Images/Insta';
import WhatsApp from '../components/Images/whatsApp';

const Certificate = ({
  name,
  Position,
  dateOfConductStart,
  dateOfConductEnd,
  CompanyLogo,
  CompanyDetails,
  backgroundImg,
  batch,
  salary,
  experience,
  degree,
  Heading,
}) => {
  const certificateRef = useRef(null);
  const [backgroundImgUrl, setBackgroundImgUrl] = useState('');

  useEffect(() => {
    certificateRef.current = document.getElementById('certificateContainer');
    setBackgroundImgUrl(backgroundImg?.preview || '');
  }, [backgroundImg]);

  const handleDownloadCertificate = () => {
    if (certificateRef.current) {
      html2canvas(certificateRef.current, { logging: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'mm', [1280, 800]); //1000, 670
        pdf.addImage(imgData, 'PNG', 0, 0, 1280, 800, undefined, 'FAST', 0); //1000, 670
        pdf.save(`${name.split(' ').join('_')}_certificate_${new Date().getMilliseconds()}`);
      });
    } else {
      console.error('certificateRef is not ready!');
    }
  };

  const handleOpenPdf = () => {
    html2canvas(certificateRef.current, { logging: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', [1280, 800]);
      pdf.addImage(imgData, 'PNG', 0, 0, 1280, 800, undefined, 'FAST', 0);
      pdf.setTextColor(0, 0, 255);

      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    });
  };

  const handleDownloadCertificate_as_Image = () => {
    if (certificateRef.current) {
      html2canvas(certificateRef.current, { logging: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = imgData;
        downloadLink.download = `${name.split(' ').join('_')}_certificate_${new Date().getMilliseconds()}.png`;
        downloadLink.click();
        if (downloadLink.parentElement) {
          document.body.removeChild(downloadLink);
        }
      });
    } else {
      console.error('certificateRef is not ready!');
    }
  };


  
  return (
    <>
      <div className={styles.certificateWrapper}>

{/*If you want any changes then make it here*/}

        <div
          id="certificateContainer"
          className={styles.certificateContainer}
          style={{ backgroundImage: `url(${backgroundImgUrl})`,backgroundSize: "cover",
          backgroundRepeat: "no-repeat", }}>
            {/* Your Company Heading here */}
          <p className={styles.primaryHeadingText}>{Heading}</p>
            {/* Your CompanyLogo Here */}
          <div className={styles.CompanyLogoBlock}>
            <img className={styles.CompanyLogo} src={CompanyLogo?.preview || ''} alt="" />
            <span className={styles.horizontalBar} />
            <span className={styles.smallText}>{CompanyDetails}</span>
          </div>
              {/* Your Company Related details here */}
          <div className={`${styles.additionalDetailsContainer}`}>
             <div className={`${styles.additionalDetails_left}`}>
               <p>
                 Company :<span>{name}</span>
               </p>
               <p>
                 Position :<span>{Position}</span>
               </p>
               <p>
                 Degree : <span>{degree}</span>
               </p>
             </div>
           
             <div className={`${styles.additionalDetails_right}`}>
               <p>
                 Batch :<span>{batch}</span>
               </p>
               <p>
                 Salary : <span>{salary}</span>
               </p>
               <p>
                 Experience :<span> {experience}</span>
               </p>
             </div>
           </div>
           {/* Your Company, Date Of Conduct STRART & END here*/}
          <p>Date of Conduct Start & End : 
             <span className={styles.smallText}>{`from ${
            dateOfConductStart ? moment(dateOfConductStart).format('MMMM YYYY') : '-'
          } to ${dateOfConductEnd ? moment(dateOfConductEnd).format('MMMM YYYY') : '-'}`}</span>
          </p>
          {/* WhatsApp & Insta Link Here*/}
          <div className={styles.social_link}>  
          
                <h2 className= {styles.whatsapp_group}>  <a href="https://chat.whatsapp.com/D9E4Hkfk2hF7EhBPx1Ii" target="_blank" rel="noopener noreferrer">Apply link in WhatsApp Group</a></h2>
            <div className={styles.whatsapp_channel_and_insta} >
              <h2 style={{marginBlock:'5px'}}><a  href="https://whatsapp.com/channel/t5543534gtgrtrgg" target="_blank" rel="noopener noreferrer"><WhatsApp />Join Our WhatsApp Channel</a></h2>
              {/*<h2><a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">Join Our WhatsApp Channel in Bio</a></h2>*/}
              <h2 style={{marginBlock:'5px'}}><a  href="https://www.instagram.com/your_instagram_account/" target="_blank" rel="noopener noreferrer"><Insta />Follow For More Updates</a></h2>
           </div>
          </div>


        </div>

{/*If you want any changes then make it in above content*/}

        <div className={styles.buttons}>
          <button className={styles.button_margin} onClick={handleDownloadCertificate}>
            Download PDF
          </button>
          <button className={styles.button_margin} onClick={handleOpenPdf}>
            Open PDF
          </button>
          <button className={styles.button_margin} onClick={handleDownloadCertificate_as_Image}>
            Download Image
          </button>
        </div>
      </div>
    </>
  );
};

Certificate.propTypes = {
  name: PropTypes.string.isRequired,
  Position: PropTypes.string,
  Heading: PropTypes.string,
  dateOfConductStart: PropTypes.string,
  dateOfConductEnd: PropTypes.string,

  CompanyLogo: PropTypes.oneOfType([
    PropTypes.string, // Allow string
    PropTypes.shape({
      preview: PropTypes.string, // Add more specific validation for the object structure
      // Other properties if any
    }),
  ]).isRequired, // Adjust the type accordingly
  /* companyLogo: PropTypes.shape({
    preview: PropTypes.string,
  }), */
  CompanyDetails: PropTypes.string,
  backgroundImg: PropTypes.oneOfType([
    PropTypes.string, // Allow string
    PropTypes.shape({
      preview: PropTypes.string, // Add more specific validation for the object structure
      // Other properties if any
    }),
  ]).isRequired,
  batch: PropTypes.string,
  salary: PropTypes.string,
  experience: PropTypes.string,
  degree: PropTypes.string,
};

export default Certificate;







