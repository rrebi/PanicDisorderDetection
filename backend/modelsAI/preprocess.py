import pickle
import pandas as pd

try:
    with open('C:\\Users\\rebec\\Desktop\\PanicDisorderDetection\\backend\\modelsAI\\svm_model.pkl', 'rb') as svm_file:
        svm_model = pickle.load(svm_file)
except Exception as e:
    print(f"Error loading SVM model: {e}")
    svm_model = None

try:
    with open('C:\\Users\\rebec\\Desktop\\PanicDisorderDetection\\backend\\modelsAI\\dtc_model.pkl', 'rb') as tree_file:
        pipeline_dt_pruned, label_encoders_dt = pickle.load(tree_file)
except Exception as e:
    print(f"Error loading Decision Tree model: {e}")
    pipeline_dt_pruned = None

try:
    with open('C:\\Users\\rebec\\Desktop\\PanicDisorderDetection\\backend\\modelsAI\\xgb_model.pkl', 'rb') as xgboost_file:
        pipeline_xgb_tuned, label_encoders_xgb = pickle.load(xgboost_file)
except Exception as e:
    print(f"Error loading XGBoost model: {e}")
    pipeline_xgb_tuned = None


column_mapping = {
    'age': 'Age',
    'gender': 'Gender',
    'family_history': 'Family History',
    'personal_history': 'Personal History',
    'current_stressors': 'Current Stressors',
    'symptoms': 'Symptoms',
    'severity': 'Severity',
    'impact_on_life': 'Impact on Life',
    'demographics': 'Demographics',
    'medical_history': 'Medical History',
    'psychiatric_history': 'Psychiatric History',
    'substance_use': 'Substance Use',
    'coping_mechanisms': 'Coping Mechanisms',
    'social_support': 'Social Support',
    'lifestyle_factors': 'Lifestyle Factors'
}

feature_order = [
    'Age', 'Gender', 'Family History', 'Personal History', 'Current Stressors',
    'Symptoms', 'Severity', 'Impact on Life', 'Demographics', 'Medical History',
    'Psychiatric History', 'Substance Use', 'Coping Mechanisms', 'Social Support',
    'Lifestyle Factors'
]

def preprocess_for_tree_and_xgb(df, label_encoders):
    df.drop(columns=['user_id', 'id'], inplace=True, errors='ignore')
    df.rename(columns=column_mapping, inplace=True)
    df = df[feature_order]

    categorical_features = [col for col in df.columns if df[col].dtype == 'object']

    for col in categorical_features:
        le = label_encoders[col]
        df[col] = le.transform(df[col])

    return df

def preprocess_for_svm(df):
    df.drop(columns=['user_id', 'id'], inplace=True, errors='ignore')
    df.rename(columns=column_mapping, inplace=True)
    df = df[feature_order]

    return df

def preprocess_and_predict(data, algorithm):
    df = pd.DataFrame([data])

    if algorithm == 0:
        # SVM
        if svm_model is not None:
            df_svm = preprocess_for_svm(df)
            prediction = svm_model.predict(df_svm)
        else:
            raise ValueError("SVM model not loaded")
    elif algorithm == 1:
        if pipeline_dt_pruned is not None:
            df_dt = preprocess_for_tree_and_xgb(df, label_encoders_dt)
            prediction = pipeline_dt_pruned.predict(df_dt)
        else:
            raise ValueError("Decision Tree model not loaded")
    elif algorithm == 2:
        if pipeline_xgb_tuned is not None:
            df_xgb = preprocess_for_tree_and_xgb(df, label_encoders_xgb)
            prediction = pipeline_xgb_tuned.predict(df_xgb)
        else:
            raise ValueError("XGBoost model not loaded")
    else:
        raise ValueError("Invalid algorithm specified")

    prediction_label = 'No Panic Disorder' if prediction[0] == 0 else 'Possible Panic Disorder'
    return prediction_label
