var https = require('https');

var OxfordDictionary = function (obj) {
    this.config = {
        app_id: obj.app_id,
        app_key: obj.app_key,
        source_lang: obj.source_lang || 'en-us'
    };
};

// GET /entries/{source_lang}/{word_id}
// GET /entries/{source_lang}/{word_id}?fields={filters}
//     filters should be comma-separated string (e.g. "filter1,filter2,filter3")
OxfordDictionary.prototype.find = function (props) {
    var path = validate('entries', props, this, null);
    var options = new OptionObj(path, this.config.app_id, this.config.app_key);
    return buildRequest(options);
} // .find

// GET /entries/{source_lang}/{word_id}?fields=definitions
OxfordDictionary.prototype.definitions = function (props) {
    var path = validate('entries', props, this, 'definitions');
    var options = new OptionObj(path, this.config.app_id, this.config.app_key);
    return buildRequest(options);
} // .definitions

// GET /entries/{source_lang}/{word_id}?fields=examples
OxfordDictionary.prototype.examples = function (props) {
    var path = validate('entries', props, this, 'examples');
    var options = new OptionObj(path, this.config.app_id, this.config.app_key);
    return buildRequest(options);
} // .examples

// GET /entries/{source_lang}/{word_id}?fields=pronunciations
OxfordDictionary.prototype.pronunciations = function (props) {
    var path = validate('entries', props, this, 'pronunciations');
    var options = new OptionObj(path, this.config.app_id, this.config.app_key);
    return buildRequest(options);
} // .pronunciations

// GET /lemmas/{source_lang}/{word_id}
// GET /lemmas/{source_lang}/{word_id}?{filters}
OxfordDictionary.prototype.inflections = function (props) {
    var path = validate('lemmas', props, this, null);
    var options = new OptionObj(path, this.config.app_id, this.config.app_key);
    return buildRequest(options);
} // .inflections

//GET /thesaurus/{source_lang}/{word_id}?fields=synonyms
OxfordDictionary.prototype.synonyms = function (props) {
    var path = validate('thesaurus', props, this, 'synonyms');
    var options = new OptionObj(path, this.config.app_id, this.config.app_key);
    return buildRequest(options);
} // .synonyms

//GET /thesaurus/{source_lang}/{word_id}?fields=synonyms
OxfordDictionary.prototype.antonyms = function (props) {
    var path = validate('thesaurus', props, this, 'antonyms');
    var options = new OptionObj(path, this.config.app_id, this.config.app_key);
    return buildRequest(options);
} // .antonyms

//GET /thesaurus/{source_lang}/{word_id}
OxfordDictionary.prototype.thesaurus = function (props) {
    var path = validate('thesaurus', props, this, null);
    var options = new OptionObj(path, this.config.app_id, this.config.app_key);
    return buildRequest(options);
} // .thesaurus

// GET /sentences/{source_language}/{word_id}
OxfordDictionary.prototype.sentences = function (props) {
    var path = validate('sentences', props, this, null);
    var options = new OptionObj(path, this.config.app_id, this.config.app_key);
    return buildRequest(options);
} // .sentences

// GET translations/{source_translation_language}/{target_translation_language}/{word_id}
OxfordDictionary.prototype.translate = function (props) {
    var path = validate('translations', props, this, null);
    var options = new OptionObj(path, this.config.app_id, this.config.app_key);
    return buildRequest(options);
} // .translate


// Validation function
var validate = function (endpoint, props, $this, dtype) {
    let path = `/api/v2/${endpoint}`;

    if (typeof props === 'string') {
        props = { word: props.toLowerCase() };
    }

    if (!($this.config.app_id) || !($this.config.app_key)) {
        throw Error('API_ID or API_KEY is undefined or NULL.');
    }

    if (typeof props != 'object' && typeof props != 'string') {
        throw Error('Argument is not of proper type');
    }

    if (typeof props != 'undefined' && typeof props === 'object') {
        if (!props.hasOwnProperty('word')) {
            throw Error('A word must be passed as a prop.');
        }
        // translate endpoint
        if (endpoint === 'translations' && props.hasOwnProperty('target_language') && (typeof props.target_language === 'string')) {
            path += `/${encodeURIComponent(props.target_language.toLowerCase())}`;
        }

        if (props.hasOwnProperty('word') && (typeof props.word === 'string')) {
            path += `/${$this.config.source_lang}/${props.word.toLowerCase()}`;
        } else {
            throw Error('Word argument not found');
        }
        
        let fields;

        if (!(dtype === null) && (typeof dtype === 'string') && !(dtype === 'entries')) {
            if (fields == null) {
                fields = `?fields=${encodeURIComponent(dtype)}`;
            } else {
                fields += `,${encodeURIComponent(dtype)}`;
            }
        }

        if (props.hasOwnProperty('filters') && (typeof props.filters === 'string')) {
            if (fields == null) {
                fields = `?fields=${encodeURIComponent(props.filters)}`;
            } else {
                fields += `,${encodeURIComponent(props.filters)}`;
            }
        }
        if (fields) {
            path += fields;
        }
    }
    return path;
}; // end validateProp

// HTTPS Request Promise Builder
var buildRequest = function (options) {
    return new Promise(function (resolve, reject) {
        https.get(options, function (res) {
            if (res.statusCode == 404) {
                return reject("No such entry found.");
            }
            var data = "";

            res.on('data', function (chunk) {
                data += chunk;
            });

            res.on('end', function () {
                var result;
                try {
                    result = JSON.parse(data);
                } catch (exp) {
                    result = {
                        'status_code': 500,
                        'status_text': 'JSON Parse Failed'
                    };
                    reject(result);
                }
                resolve(result);
            });

            res.on('error', function (err) {
                reject(err);
            });
        }); // end https.get
    }); // end promise
}; // end buildRequest


// Constructor Function for Option Objects
function OptionObj(path, app_id, app_key) {
    var options = {
        host: 'od-api.oxforddictionaries.com',
        port: 443,
        path: path,
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "app_id": app_id,
            "app_key": app_key
        }
    };
    return options;
} // end OptionObj

module.exports = OxfordDictionary;
