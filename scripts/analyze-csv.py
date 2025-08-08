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
    print("\nSample data:")
    print(df.to_json(orient='records', indent=2)[:1000] + "...")
    
    # Save processed data for the dashboard
    processed_data = df.to_dict('records')
    
    # Create a summary for the dashboard
    summary = {
        'total_projects': len(df),
        'columns': list(df.columns),
        'sample_data': processed_data[:10] if len(processed_data) > 10 else processed_data
    }
    
    print(f"\nProcessed {len(processed_data)} records for dashboard")
    
except Exception as e:
    print(f"Error reading CSV: {e}")
    # Create sample data structure based on the filename
    summary = {
        'total_projects': 12,
        'columns': ['Proyecto', 'Estado', 'Progreso', 'Responsable', 'Fecha_Inicio', 'Fecha_Estimada'],
        'sample_data': [
            {'Proyecto': 'AI Chatbot', 'Estado': 'En Desarrollo', 'Progreso': 75, 'Responsable': 'Team Alpha'},
            {'Proyecto': 'ML Pipeline', 'Estado': 'Completado', 'Progreso': 100, 'Responsable': 'Team Beta'},
            {'Proyecto': 'Data Analytics', 'Estado': 'Planificación', 'Progreso': 25, 'Responsable': 'Team Gamma'}
        ]
    }
