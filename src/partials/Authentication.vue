<template>
	<div id="sign-in-dialog" class="zoom-anim-dialog mfp-hide">
		<div class="small-dialog-header">
			<h3>Autenticación</h3>
		</div>
		<!--Tabs -->
		<div class="sign-in-form style-1">
			<ul class="tabs-nav">
				<li class=""><a href="#tab1">Ingresar</a></li>
				<li><a href="#tab2">Registrase</a></li>
			</ul>
			<div class="tabs-container alt">
				<!-- Login -->
				<div class="tab-content" id="tab1" style="display: none;">
					<form @submit.prevent="login" class="login">
						<p class="form-row form-row-wide">
							<label for="username">Usuario:
								<i class="im im-icon-Male"></i>
								<input type="text" class="input-text" name="username" id="username" value="" />
							</label>
						</p>
						<p class="form-row form-row-wide">
							<label for="password">Contraseña:
								<i class="im im-icon-Lock-2"></i>
								<input class="input-text" type="password" name="password" id="password"/>
							</label>
							<span class="lost_password">
								<a href="#" >¿Has olvidado tu contraseña?</a>
							</span>
						</p>
						<div class="form-row">
							<input type="submit" class="button border margin-top-5" name="login" value="Ingresar" />
							<div class="checkboxes margin-top-10">
								<input id="remember-me" type="checkbox" name="check">
								<label for="remember-me">Recordarme</label>
							</div>
						</div>
					</form>
				</div>

				<!-- Register -->
				<div class="tab-content" id="tab2" style="display: none;">
					<form @submit.prevent="register" class="register">
						<p class="form-row form-row-wide">
							<label for="username2">Usuario:
								<i class="im im-icon-Male"></i>
								<input type="text" class="input-text" name="username" id="username2" value="" />
							</label>
						</p>
						
						<p class="form-row form-row-wide">
							<label for="email2">Email:
								<i class="im im-icon-Mail"></i>
								<input type="text" class="input-text" name="email" id="email2" value="" />
							</label>
						</p>
		
						<p class="form-row form-row-wide">
							<label for="password1">Contraseña:
								<i class="im im-icon-Lock-2"></i>
								<input class="input-text" type="password" name="password1" id="password1"/>
							</label>
						</p>
		
						<p class="form-row form-row-wide">
							<label for="password2">Repetir Contraseña:
								<i class="im im-icon-Lock-2"></i>
								<input class="input-text" type="password" name="password2" id="password2"/>
							</label>
						</p>
						<input type="submit" class="button border fw margin-top-10" name="register" value="Registrase" />
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {

	}
</script>