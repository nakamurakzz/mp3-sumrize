import openai
import requests
from transformers import pipeline

# OpenAI APIキーの設定
openai.api_key = "your_openai_api_key"

# 音声ファイルのURL
audio_url = "your_audio_url"

# Whisper APIにリクエストを送信して音声データをテキストに変換
response = openai.Audio.create(
    url=audio_url,
    sample_rate=16000,
    language="Japanese",
    callback="https://yourcallback.url",
)

# 応答から変換されたテキストを取得
transcript = response["choices"][0]["text"]

# 要約パイプラインの設定
summarizer = pipeline("summarization", model="your_preferred_model",
                      tokenizer="your_preferred_tokenizer")

# テキストの要約
summary = summarizer(transcript, max_length=100,
                     min_length=30, do_sample=False)

# 要約の結果を出力
print(summary[0]["summary_text"])
