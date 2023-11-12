const q = (v) => { return document.querySelector(v); },
    qa = (v) => { return document.querySelectorAll(v); };

log = () => { ll.classList.add('on'); ss.classList.remove('on'); localStorage.setItem('form_type', 'sign') }
sign_up = () => { ss.classList.add('on'); ll.classList.remove('on'); localStorage.setItem('form_type', 'create') }

const toggle_account = () => {
    gts.onmousedown = () => { sign_up(); }
    ll.onmousedown = () => { log(); }
    ss.onmousedown = () => { sign_up(); }
    as.onmousedown = () => { log() }
    acr.onmousedown = () => { sign_up() }
}

const form_check = () => {
    let name_valid = false, email_valid = false, username_valid = false, pass_valid = false;
    sign_up_name.oninput = function () {
        name_length = this.value.length;
        if (name_length > 10 && (this.value.includes(' '))) { sign_up_name.classList.add('success'); name_valid = true; } else { sign_up_name.classList.remove('success'); name_valid = false }
    }
    sign_up_username.oninput = function () {
        username_length = this.value.length;
        if (username_length > 7 && !(this.value.includes(' '))) { sign_up_username.classList.add('success'); username_valid = true } else { sign_up_username.classList.remove('success'); username_valid = false }
    }
    let email_reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    sign_up_email.oninput = function () {
        if (this.value.match(email_reg)) {
            this.classList.add('success');
            email_valid = true;
        } else {
            this.classList.remove('success')
            email_valid = false
        }
    }


    prevent_space = (e) => {
        for (i of e.value) { if (i === ' ') { confirm("We don't accept spaces or copy-paste in password, for security reasons") } }
        e.value = e.value.replace(' ', '')
    }
    validate_pass = (i, j) => {
        let _2num = /^(?=(.*[0-9]){2,})/, _2lc = /^(?=(.*[a-z]){2,})/, _2up = /^(?=(.*[A-Z]){2,})/, _2sp = /^(?=(.*[~`/?|;:'"!¥£€π@#$%^&*{}[\\\]()\-__+=,.]){2,})/,
            pass_reg = /^(?=(.*[a-z]){2,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[~`/?|;:'"!¥£€π@#$%^&*{}[\\\]()\-__+=,.]){2,}).{8,}/, psv = false;

        const check_single_entity = () => {
            const entity = () => {
                let good = '<i data-aos="zoom-in" class="far fa-check-circle"></i>', bad = '<i data-aos="zoom-out" class="fas fa-circle-exclamation"></i>';
                let entites = [_2num, _2lc, _2up, _2sp], enty_val = [_n_, _lc_, _uc_, _sc_];

                for (let k = 0; k < entites.length; k++) {
                    if (i.value.match(entites[k])) { enty_val[k].innerHTML = good; enty_val[k].classList.add('ok') } else { enty_val[k].innerHTML = bad; enty_val[k].classList.remove('ok') }
                }
                if (i.value.length >= 8) {
                    _8c_.innerHTML = good; _8c_.classList.add('ok')
                } else {
                    _8c_.innerHTML = bad; _8c_.classList.remove('ok')
                }
            }
            entity()

        }, pass_final = (x) => {
            if (x.value.match(pass_reg)) { x.classList.add('succ'); psv = true } else { x.classList.remove('succ'); psv = false }
        }; pass_final(i); pass_final(j); check_single_entity();

        if (psv && (i.value === j.value) && i.value.length < 16) { i.classList.add('success'); j.classList.add('success'); pass_valid = true } else { i.classList.remove('success'); j.classList.remove('success'); pass_valid = false }
    }
    creat_pass1.oninput = function () { prevent_space(this); validate_pass(this, creat_pass2) }
    creat_pass2.oninput = function () { prevent_space(this); validate_pass(this, creat_pass1) }

    create_account.onmousedown = () => {
        if (name_valid && username_valid && email_valid && pass_valid) {
            m_img.src = 'img/ok.png'
            m_pa.innerHTML = 'Account created successfully!!!'
            modal.showModal();
            modal.onmousedown = () => { modal.close() }
            window.location.href = origin + '/log.html#sign_in'; log();
        } else {
            m_img.src = 'img/cancel.png'
            m_pa.innerHTML = 'Invalid credentials!'
            modal.showModal();
            modal.onmousedown = () => { modal.close() }
        }

    }
}
show_hide_pass = () => {

    let all_pass = qa('.pa'), show = qa('#show'), ey = qa('#ey');
    show[0].onmousedown = function () {all_pass[0].type = (all_pass[0].type === 'password') ? (all_pass[0].type = 'text') : (all_pass[0].type = 'password');ey[0].innerHTML = (all_pass[0].type === 'password') ? (ey[0].innerHTML ='<i class="far fa-eye-slash"></i>') : (ey[0].innerHTML = '<i class="far fa-eye"></i>')}
    show[1].onmousedown = function () {all_pass[1].type = (all_pass[1].type === 'password') ? (all_pass[1].type = 'text', all_pass[2].type = 'text') : (all_pass[1].type = 'password', all_pass[2].type = 'password');ey[1].innerHTML = (all_pass[1].type === 'password') ? (ey[1].innerHTML ='<i class="far fa-eye-slash"></i>') : (ey[1].innerHTML = '<i class="far fa-eye"></i>')}
}
window.onload = () => {
    show_hide_pass()
    let form = localStorage.getItem('form_type');
    let origin = window.location.origin;
    if (form === 'sign') {
        window.location.href = origin + '/log.html#sign_in'; log()
    } else if (form === 'create') {
        window.location.href = origin + '/log.html#sign_up'; sign_up();
    }
    toggle_account()
    form_check()
}