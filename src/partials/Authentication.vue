<template>
	<div id="sign-in-dialog" class="zoom-anim-dialog mfp-hide">
		<div class="small-dialog-header">
			<h3>Autenticación</h3>
		</div>
		<!--Tabs -->
		<div class="sign-in-form style-1">
			<ul class="tabs-nav">
				<li class=""><a href="#tab1">Ingresar</a></li>
				<li><a href="#tab2">Registrarse</a></li>
			</ul>
			<div class="tabs-container alt">
				<!-- Login -->
				<div class="tab-content" id="tab1" style="display: none;">
					<form @submit.prevent="logIn" class="login">
						<p class="form-row form-row-wide">
							<label for="email">Usuario:
								<i class="im im-icon-Male"></i>
								<input type="text" class="input-text" name="lEmail" id="lEmail" v-model="l.email"/>
							</label>
						</p>
						<p class="form-row form-row-wide">
							<label for="password">Contraseña:
								<i class="im im-icon-Lock-2"></i>
								<input class="input-text" type="password" name="lPassword" id="lPassword" v-model="l.password"/>
							</label>
							<span class="lost_password">
								<a href="#" >¿Has olvidado tu contraseña?</a>
							</span>
						</p>
						<div class="form-row">
							<input type="submit" class="button border margin-top-5" name="login" value="Ingresar" />
						</div>
					</form>
				</div>

				<!-- Register -->
				<div class="tab-content" id="tab2" style="display: none;">
					<form @submit.prevent="register" class="register">
						<p class="form-row form-row-wide">
							<label for="username2">Usuario:
								<i class="im im-icon-Male"></i>
								<input type="text" class="input-text" name="rUsername" id="rUsername" v-model="r.username"/>
							</label>
						</p>
						
						<p class="form-row form-row-wide">
							<label for="email2">Email:
								<i class="im im-icon-Mail"></i>
								<input type="text" class="input-text" name="rEmail" id="rEmail" v-model="r.email"/>
							</label>
						</p>
		
						<p class="form-row form-row-wide">
							<label for="password1">Contraseña:
								<i class="im im-icon-Lock-2"></i>
								<input class="input-text" type="password" name="rPassword" id="rPassword" v-model="r.password"/>
							</label>
						</p>
		
						<p class="form-row form-row-wide">
							<label for="password2">Repetir Contraseña:
								<i class="im im-icon-Lock-2"></i>
								<input class="input-text" type="password" name="rConfirmPassword" id="rConfirmPassword" v-model="r.confirmPassword"/>
							</label>
						</p>
						<input type="submit" class="button border fw margin-top-10" name="register" value="Registrarse"/>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import hasEmptyFields from "@/mixins/hasEmptyFields"
	import { AUTH, DB } from "@/firebase"
	export default {
		mixins: [hasEmptyFields],
		data() {
			return {
				l: {
					email: "",
					password: ""
				},
				r: {
					username: "",
					email: "",
					password: "",
					confirmPassword: ""
				}
			}
		},
		methods: {
			usernameExists(username) {
				console.log("entrando")
				return new Promise(resolve => {
					DB.ref("/registeredUsernames/" + username).once("value")
					.then(snapshot => resolve(snapshot.exists()))
				})
			},
			logIn() {
				if (this.hasEmptyFields(this.l)) {
					const message = "No has rellenado todos los campos."
					console.error(message)
					alert(message)
					return
				}

				AUTH.signInWithEmailAndPassword(this.l.email, this.l.password)
				.then(() => {
					console.log("logueado")
				}).catch((err) => {
					console.error(err)
					alert(err.message)
				})
			},
			register() {
				// Empty fields
				if (this.hasEmptyFields(this.r)) {
					const message = "No has rellenado todos los campos."
					console.error(message)
					alert(message)
					return
				}
				// Password and confirmation don't match
				if (this.r.password !== this.r.confirmPassword) {
					const message = "Las contraseñas no coindicen, verifícalas e intenta de nuevo."
					console.error(message)
					alert(message)
					return
				}

				const username = this.r.username
				
				this.usernameExists(username)
				.then((exists) => {
					console.log(exists)
					if (exists) {
						const message = "El nombre de usuario no se encuentra disponible."
						console.error(message)
						alert(message)
					} else {
						AUTH.createUserWithEmailAndPassword(this.r.email, this.r.password)
						.then((resp) => {
							const uid = resp.user.uid
							DB.ref("/users/" + uid + "/info").update({
								username: username,
								email: this.r.email
							})
							.then(() => {
								DB.ref("/registeredUsernames").child(username).set(true)
								.then(() => alert("Registrado con éxito."))
							})
							.catch(err => {
								console.error(err)
								alert(err)
							})
						})
					}
				}).catch(err => console.error(err))
			}
		}
	}
</script>