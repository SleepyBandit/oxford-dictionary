# oxford-dictionary
A NodeJS wrapper for using the oxforddictionary.com REST API.

# Install:
```
    npm install oxford-dictionary
```

# Setup:
Require the module then pass in a config object with your APP_ID, APP_KEY, and preferred supported language.
```  
  var Dictionary = require("oxford-dictionary");
  
  var config = {
    app_id : "YOUR_OXFORD_ACCOUNT_APP_ID",
    app_key : "YOUR_OXFORD_ACCOUNT_APP_KEY",
    source_lang : "en"
  };
  
  var dict = new Dictionary(config);
```

# Usage:
To use you can pass in a word directly...
```
  var lookup = dict.find("awesome");

  lookup.then(function(res) {
      console.log(res);
  },
  function(err) {
      console.log(err);
  });
```
Or, if you want to use filters, regions, or declare a target language for translation, you can use an object with properties. The one required property is word. The RESTful endpoints for the API only allow for a filter OR region OR target_language, not a combination of them.

```
  var props = {
      word: "stupendous",
      // filter: "grammaticalFeatures=singular,past;lexicalCategory=noun",
      // region: "us",
      // target_language: "es"
  };

  var lookup = dict.find(props);

  lookup.then(function(res) {
      console.log(res);
  },
  function(err) {
      console.log(err);
  });
```
A promise is returned which you can handle as desired.
```
  lookup.then(function(res) {
      // res contains the json response
      console.log(res);
  },
  function(err) {
      // err contains any failed responses to handle as desired
      console.log(err);
  });
```

# Methods:
Most, but not all RESTful endpoints for the Oxford Dictionary API have a method associated with it in this NodeJS wrapper. More will be added in the future.

## .find
`.find` retrieves available dictionary entries for a given word and language.
A region OR filter can optionally be passed in an object with the word.
```
  var lookup = dict.find("awesome");
```
## .definitions
`.definitions` retrieves available dictionary entries for given word and language and returns the definitions.
```
  var lookup = dict.definitions("awesome");
```
## .inflections
`.inflections` retrieves available lemmas for a given inflected wordform.
A filter can optionally be passed in an object with the word.
```
  var lookup = dict.inflections("awesome");
```
## .pronunciations
`.pronunciations` retrieves available dictionary entries for given word and language and returns the pronunciation.
```
  var lookup = dict.pronunciations("awesome");
```
## .examples
`.examples` retrieves available dictionary entries for given word and language and returns only examples.
```
  var lookup = dict.examples("awesome");
```
## .synonyms
`.synonyms` retrieves available synonyms for a given word and language.
```
  var lookup = dict.synonyms("awesome");
```
## .antonyms
`.antonyms` retrieves available antonyms for a given word and language.
```
  var lookup = dict.antonyms("awesome");
```
## .thesaurus
`.thesaurus` retrieves available synonyms AND antonyms for a given word and language.
```
  var lookup = dict.thesaurus("awesome");
```
## .sentences
`.sentences` retrieves list of sentences and list of senses (English language only).
```
  var lookup = dict.sentences("awesome");
```
## .translate
`.translate` retrieves list of sentences and list of senses (English language only).
You must pass in a word and target language.
```
  var lookup = dict.translate({
    word: "awesome",
    target_language: "es"
  });
```

# Response:
Response is a json object from which you can access the required details such as definition, type, audio files, example statements.
```
  {
  "metadata": {
    "provider": "Oxford University Press"
  },
  "results": [
    {
      "id": "ace",
      "language": "en",
      "lexicalEntries": [
        {
          "entries": [
            {
              "grammaticalFeatures": [
                {
                  "text": "Positive",
                  "type": "Degree"
                }
              ],
              "homographNumber": "001",
              "senses": [
                {
                  "definitions": [
                    "very good:"
                  ],
                  "examples": [
                    {
                      "text": "Ace! You've done it!"
                    },
                    {
                      "text": "an ace swimmer"
                    }
                  ],
                  "id": "m_en_gb0004640.006",
                  "registers": [
                    "informal"
                  ]
                }
              ]
            }
          ],
          "language": "en",
          "lexicalCategory": "Adjective",
          "pronunciations": [
            {
              "audioFile": "http://audio.oxforddictionaries.com/en/mp3/ace_gb_1.mp3",
              "dialects": [
                "British English"
              ],
              "phoneticNotation": "IPA",
              "phoneticSpelling": "eɪs"
            }
          ],
          "text": "ace"
        },
        {
          "entries": [
            {
              "etymologies": [
                "Middle English (denoting the ‘one’ on dice): via Old French from Latin as unity, a unit"
              ],
              "grammaticalFeatures": [
                {
                  "text": "Singular",
                  "type": "Number"
                }
              ],
              "homographNumber": "000",
              "senses": [
                {
                  "definitions": [
                    "a playing card with a single spot on it, ranked as the highest card in its suit in most card games:"
                  ],
                  "domains": [
                    "Cards"
                  ],
                  "examples": [
                    {
                      "registers": [
                        "figurative"
                      ],
                      "text": "life had started dealing him aces again"
                    },
                    {
                      "text": "the ace of diamonds"
                    }
                  ],
                  "id": "m_en_gb0004640.001"
                },
                {
                  "definitions": [
                    "a person who excels at a particular sport or other activity:"
                  ],
                  "domains": [
                    "Sport"
                  ],
                  "examples": [
                    {
                      "text": "a motorcycle ace"
                    }
                  ],
                  "id": "m_en_gb0004640.002",
                  "registers": [
                    "informal"
                  ],
                  "subsenses": [
                    {
                      "definitions": [
                        "a pilot who has shot down many enemy aircraft:"
                      ],
                      "domains": [
                        "Air Force"
                      ],
                      "examples": [
                        {
                          "text": "a Battle of Britain ace"
                        }
                      ],
                      "id": "m_en_gb0004640.003",
                      "registers": [
                        "informal"
                      ]
                    }
                  ]
                },
                {
                  "definitions": [
                    "(in tennis and similar games) a service that an opponent is unable to return and thus wins a point:"
                  ],
                  "domains": [
                    "Tennis"
                  ],
                  "examples": [
                    {
                      "text": "Nadal banged down eight aces in the set"
                    }
                  ],
                  "id": "m_en_gb0004640.004",
                  "subsenses": [
                    {
                      "definitions": [
                        "a hole in one:"
                      ],
                      "domains": [
                        "Golf"
                      ],
                      "examples": [
                        {
                          "text": "his hole in one at the 15th was Senior's second ace as a professional"
                        }
                      ],
                      "id": "m_en_gb0004640.005",
                      "registers": [
                        "informal"
                      ]
                    }
                  ]
                }
              ]
            }
          ],
          "language": "en",
          "lexicalCategory": "Noun",
          "pronunciations": [
            {
              "audioFile": "http://audio.oxforddictionaries.com/en/mp3/ace_gb_1.mp3",
              "dialects": [
                "British English"
              ],
              "phoneticNotation": "IPA",
              "phoneticSpelling": "eɪs"
            }
          ],
          "text": "ace"
        },
        {
          "entries": [
            {
              "grammaticalFeatures": [
                {
                  "text": "Transitive",
                  "type": "Subcategorization"
                },
                {
                  "text": "Present",
                  "type": "Tense"
                }
              ],
              "homographNumber": "002",
              "senses": [
                {
                  "definitions": [
                    "(in tennis and similar games) serve an ace against (an opponent):"
                  ],
                  "domains": [
                    "Tennis"
                  ],
                  "examples": [
                    {
                      "text": "he can ace opponents with serves of no more than 62 mph"
                    }
                  ],
                  "id": "m_en_gb0004640.007",
                  "registers": [
                    "informal"
                  ],
                  "subsenses": [
                    {
                      "definitions": [
                        "score an ace on (a hole) or with (a shot):"
                      ],
                      "domains": [
                        "Golf"
                      ],
                      "examples": [
                        {
                          "text": "there was a prize for the first player to ace the hole"
                        }
                      ],
                      "id": "m_en_gb0004640.008"
                    }
                  ]
                },
                {
                  "definitions": [
                    "achieve high marks in (a test or exam):"
                  ],
                  "examples": [
                    {
                      "text": "I aced my grammar test"
                    }
                  ],
                  "id": "m_en_gb0004640.009",
                  "regions": [
                    "North American"
                  ],
                  "registers": [
                    "informal"
                  ],
                  "subsenses": [
                    {
                      "definitions": [
                        "outdo someone in a competitive situation:"
                      ],
                      "examples": [
                        {
                          "text": "the magazine won an award, acing out its rivals"
                        }
                      ],
                      "id": "m_en_gb0004640.010",
                      "regions": [
                        "North American"
                      ]
                    }
                  ]
                }
              ]
            }
          ],
          "language": "en",
          "lexicalCategory": "Verb",
          "pronunciations": [
            {
              "audioFile": "http://audio.oxforddictionaries.com/en/mp3/ace_gb_1.mp3",
              "dialects": [
                "British English"
              ],
              "phoneticNotation": "IPA",
              "phoneticSpelling": "eɪs"
            }
          ],
          "text": "ace"
        }
      ],
      "type": "headword",
      "word": "ace"
    }
  ]
}
```