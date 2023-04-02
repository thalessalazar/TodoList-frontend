import { extend } from "vee-validate";
import { required, email, regex, confirmed, min, max} from "vee-validate/dist/rules";
import { messages as messagePt } from "vee-validate/dist/locale/pt_BR.json";

extend('required', {
    ...required,
    message: messagePt.required
});

extend('email', {
    ...email,
    message: messagePt.email
});

extend('regex', {
    ...regex,
    message: messagePt.regex
});

extend('confirmed', {
    ...confirmed,
    message: messagePt.confirmed
});

extend('min', {
    ...min,
    message: messagePt.min
});

extend('max', {
    ...max,
    message: messagePt.max
});