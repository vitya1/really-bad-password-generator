
## Really bad password generator

The tool applies popular password transformations (suffixes/preffixes/letter changes) to generate a list of passwords you shouldn't ever use (only as a list and for science only).

Based on [https://github.com/danielmiessler/SecLists/tree/master/Passwords].

Web page built with react.

## How to use

Please try example here [https://vitya1.github.io/really-bad-password-generator/]

The generator script is `/src/lib/generator.js`

To use it:
```
import generateList from './lib/generator';

let password_list = generateList(source_password, apply_letter_mapping, cross_obfuscation);

```

- source_password - source password (your dogs name for ex. ?)
- apply_letter_mapping - applies letter changes if true (smith -> sm1th)
- cross_obfuscation - mix preffix/suffix if true
