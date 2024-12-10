import React from 'react';
import styles from './Brochure.module.css';

export default function BrochureButton() {
    const brochureUrl = '/assets/docs/SR_GAS.pdf';

    return (
        <>
            <div className={styles.link} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <a
                    href={brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View Brochure
                </a>

                <a
                    href={brochureUrl}
                    download="SR_GAS.pdf"
                >
                    Download Brochure
                </a>
            </div>
        </>
    );
}
