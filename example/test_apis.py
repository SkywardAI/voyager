# coding=utf-8

# Copyright [2024] [SkywardAI]
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#        http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import unittest
import openai
import requests
import json

class TestAllAPIs(unittest.TestCase):
    """
    Test all the APIs
    """

    @classmethod
    def setUpClass(cls):
        cls.api_key = "API_KEY"
        cls.base_url="http://127.0.0.1:8000"
        cls.base_url_openai = "http://127.0.0.1:8000/v1"
        cls.client= openai.OpenAI(
            api_key=cls.api_key, base_url=cls.base_url_openai)

    @classmethod
    def tearDownClass(cls):
        pass

    def test_health(self):
        res=requests.get(url=self.base_url+"/healthy")
        self.assertEqual(res.status_code, 200)
    
    def test_inference_by_openai(self):
        completion=self.client.chat.completions.create(
            model="",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "What should I do today?"},
            ],
            max_tokens=16,
            stop=["\n### user:"],
            stream=False
        )
        # length of message should more than 0
        self.assertTrue(len(completion.choices)>0)
        print(completion.choices[0].message)
    
    def test_inference_by_request(self):
        data = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "What should I do today?"},
            ],
            "max_tokens": 16,
            "stop":["\n### user:"],
            "stream": False
        }
        res=requests.post(url=self.base_url+"/v1/chat/completions", json=data,headers={"Content-Type": "application/json", "Authorization":"Bearer no-key"},)
        self.assertEqual(res.status_code, 200)

    
    def test_inference_by_request_stream(self):
        data = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "What should I do today?"},
            ],
            "max_tokens": 16,
            "stop":["\n### user:"],
            "stream": True
        }
        res=requests.post(url=self.base_url+"/v1/chat/completions", json=data,headers={"Content-Type": "application/json", "Authorization":"Bearer no-key"},)
        self.assertEqual(res.status_code, 200)
    
    def test_rag_completion(self):
        #Load the dataset
        dataset = {
                    "name": "aisuko/squad01-v2",
                    "url": "https://datasets-server.huggingface.co/rows?dataset=aisuko%2Fsquad01-v2&config=default&split=validation&offset=0&length=100"
                }
        loadDataset = requests.post(url=self.base_url+"/v1/embeddings/dataset", json=dataset, headers={"Content-Type": "application/json", "Authorization":"Bearer no-key"})
        self.assertEqual(loadDataset.status_code, 200)

        #Test RAG completions
        data = {
                "messages": [
                    {
                    "role": "system",
                    "content": "You are a helpful assistant who helps users solve their questions."
                    },
                    {
                    "role": "user",
                    "content": "tell me something interest about massachusetts"
                    }
                ],
                "dataset_name": "aisuko/squad01-v2"
            }
        res = requests.post(url=self.base_url+"/v1/chat/rag-completions", json=data, headers={"Content-Type": "application/json", "Authorization":"Bearer no-key"})
        self.assertEqual(res.status_code, 200)

    def test_embedding_api(self):
        data = {
                "input": "Hello, world!",
                "model": "all-MiniLM-L6-v2"
            }
        res = requests.post(url=self.base_url+"/v1/embeddings", json=data, headers={"Content-Type": "application/json", "Authorization":"Bearer no-key"})
        self.assertEqual(res.status_code, 200)

    def test_api_key(self):
        res=requests.get(url=self.base_url+"/v1/token/api-key")
        self.assertEqual(res.status_code, 200)
        # api key should not be empty
        self.assertTrue(len(res.json().get("api_key"))>0)

    def test_version_api(self):
        res = requests.get(url=self.base_url+"/v1/version")
        self.assertEqual(res.status_code, 200)
        data = res.json().get("inference_engine_version")
        self.assertEqual('server--b1-27d4b7c', data)