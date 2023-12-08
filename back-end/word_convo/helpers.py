import openai
from django.conf import settings
from back_end_config.settings import env

openai.api_key = env.get("OPENAI_KEY")

def generate_text(prompt):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150,
        temperature=0.7,
    )
    # print(f"Response: {response}") 
    return response.choices[0].text.strip()
