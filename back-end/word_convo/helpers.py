import openai
# from django.conf import settings
from back_end_config.settings import env

openai.api_key = env.get("OPENAI_KEY")

def generate_text(prompt):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150,
        temperature=0.7,
    )
    return response.choices[0].text.strip()


# word = "sagacious"
# word_info = get_word_info(word)
# print(word_info)

# def generate_image(prompt):
#     try:
#         response = openai.Image.create(
#             n=1,
#             prompt=prompt,
#         )
#         print(response)  # Print the entire response for debugging
#         print(response.assets[0].url)
#         return response.assets[0].url
#     except Exception as e:
#         print(f"Error in generate_image: {e}")
#         return None  # or handle the error as needed



if __name__ =='__main__':
  generate_text("Provide a concise definition of the word 'premium', specify its part of speech, and create a sentence demonstrating its usage.")
  # generate_image(
  #    'Generate an image with dimensions 800x1200 based on the prompt:  A man standing in front of a luxurious car with a satisfied expression, holding a golden key that symbolizes the exclusive privilege of owning a premium vehicle.')