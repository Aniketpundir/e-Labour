import React, { useContext } from 'react'
import { StoreContext } from '../../../../../Context/StoreContext'

const Emergency = () => {
    const { workerProfileData } = useContext(StoreContext)
    return (
        <div className="info-card">
            <h2>Emergency Information</h2>
            <div className="info-grid">
                <div className="info-item">
                    <div className="info-label">Emergency Contact Number</div>
                    <div className="info-value">{workerProfileData.emergencyInfo
                        &&
                        workerProfileData.emergencyInfo.contact}
                    </div>
                </div>
                <div className="info-item">
                    <div className="info-label">Emergency Person Name</div>
                    <div className="info-value">{workerProfileData.emergencyInfo
                        &&
                        workerProfileData.emergencyInfo.name}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Emergency