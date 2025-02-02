import MailOutlineIcon from '@mui/icons-material/MailOutline';
import styles from './FormEnqButton.module.css';
import { useRouter } from 'next/router';

const FormEnqButton = () => {
    const router = useRouter();

    const navigateToEnqForm = () => {
        router.push('/contact');
    }

    return (
        <button className={styles.enquiryButton} onClick={navigateToEnqForm}>
            {/* Icon inside a circular white box */}
            <div className={styles.iconContainer}>
                <MailOutlineIcon fontSize="small" />
            </div>
            Enquiry
        </button>
    )
}

export default FormEnqButton;