import pandas as pd
import json

# Fetch and analyze the CSV data
url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CUADRO%20DE%20SITUACION%20DE%20DESARROLLO%20DE%20APLICACIONES%20%281%29-YkHsMl5AThlF9ONMw7KTCqzw4qfmbQ.csv"

try:
    # Read the CSV file
    df = pd.read_csv(url)
    
    print("CSV Data Analysis:")
    print("=" * 50)
    print(f"Shape: {df.shape}")
    print(f"Columns: {list(df.columns)}")
    print("\nFirst few rows:")
    print(df.head())
    print("\nData types:")
    print(df.dtypes)
    print("\nColumn details:")
    for col in df.columns:
        print(f"- {col}: {df[col].nunique()} unique values")
        if df[col].dtype == 'object':
            print(f"  Sample values: {df[col].dropna().unique()[:5]}")
    
    print("\nSample records:")
    for i, row in df.head(3).iterrows():
        print(f"Record {i+1}:")
        for col in df.columns:
            print(f"  {col}: {row[col]}")
        print()
    
    # Save processed data for the dashboard
    processed_data = df.to_dict('records')
    
    # Create a summary for the dashboard
    summary = {
        'total_projects': len(df),
        'columns': list(df.columns),
        'data': processed_data
    }
    
    print(f"\nProcessed {len(processed_data)} records for dashboard")
    
    # Export to JSON for easy integration
    with open('csv_data.json', 'w', encoding='utf-8') as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    
    print("Data exported to csv_data.json")
    
except Exception as e:
    print(f"Error reading CSV: {e}")
    print("Creating fallback structure...")
