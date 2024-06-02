export type Disorder = {
    id?: number;
    user_id: number;
    age: number;
    gender: number;  // 0 for Male, 1 for Female
    family_history: number;  // 0 for No, 1 for Yes
    personal_history: number;  // 0 for Yes, 1 for No
    current_stressors: number;  // 0 for Moderate, 1 for High, 2 for Low
    symptoms: number;  // 0 for Shortness of breath, 1 for Panic attacks, 2 for Chest pain, 3 for Dizziness, 4 for Fear of losing control
    severity: number;  // 0 for Mild, 1 for Moderate, 2 for Severe
    impact_on_life: number;  // 0 for Mild, 1 for Significant, 2 for Moderate
    demographics: number;  // 0 for Rural, 1 for Urban
    medical_history: number;  // 0 for Diabetes, 1 for Asthma, 2 for None, 3 for Heart disease
    psychiatric_history: number;  // 0 for Bipolar disorder, 1 for Anxiety disorder, 2 for Depressive disorder, 3 for None
    substance_use: number;  // 0 for None, 1 for Drugs, 2 for Alcohol
    coping_mechanisms: number;  // 0 for Socializing, 1 for Exercise, 2 for Seeking therapy, 3 for Meditation
    social_support: number;  // 0 for High, 1 for Moderate, 2 for Low
    lifestyle_factors: number;  // 0 for Sleep quality, 1 for Exercise, 2 for Diet
};
