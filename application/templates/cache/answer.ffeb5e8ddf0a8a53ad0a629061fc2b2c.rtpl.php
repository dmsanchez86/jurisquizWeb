<?php if(!class_exists('raintpl')){exit;}?><html class="ui-mobile"><head><style type="text/css">.gm-style .gm-style-mtc label,.gm-style .gm-style-mtc div{font-weight:400}</style><link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"><style type="text/css">.gm-style .gm-style-cc span,.gm-style .gm-style-cc a,.gm-style .gm-style-mtc div{font-size:10px}</style><style type="text/css">@media print {  .gm-style .gmnoprint, .gmnoprint {    display:none  }}@media screen {  .gm-style .gmnoscreen, .gmnoscreen {    display:none  }}</style><style type="text/css">.gm-style{font-family:Roboto,Arial,sans-serif;font-size:11px;font-weight:400;text-decoration:none}</style><base href="/home/subastrsds4/public_html/app/application/templates/http://subastra.com/415111911007422/page.html#page-register">
	<title>&nbsp;</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <link href="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <style type="text/css">
    body { margin-top:20px; }
.panel-body:not(.two-col) { padding:0px }
.glyphicon { margin-right:5px; }
.glyphicon-new-window { margin-left:5px; }
.panel-body .radio,.panel-body .checkbox {margin-top: 0px;margin-bottom: 0px;}
.panel-body .list-group {margin-bottom: 0;}
.margin-bottom-none { margin-bottom: 0; }
.panel-body .radio label,.panel-body .checkbox label { display:block; }
.load_area img {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}
.load_area {
  position: absolute;
  background: rgba(168, 159, 159, 0.580392);
  width: 100%;
  height: 100%;
  z-index: 99;
}
.row.contenido_general {
  position: relative;
}
    </style>
    <script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
    
<body><div style="Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;background-color:#f1f2f6">
	<table style="border-spacing:0;width:100%;background-color:#f1f2f6;table-layout:fixed">
		<tbody><tr>
			<td align="center" style="padding-right:0;padding-left:0;vertical-align:top;padding-top:24px;padding-bottom:0;font-family:sans-serif;font-size:14px;color:#bec7cf">
				<center>
					<div style="font-size:20px;line-height:20px;display:block">&nbsp;</div>
					<table style="border-spacing:0;width:650px;min-width:650px"><tbody><tr><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;font-size:1px;line-height:1px">&nbsp;</td></tr></tbody></table>
					<img src="http://subastra.com/415111911007422/img/logo-subastra.png" alt="Campaign Monitor" width="110" height="130" style="border-width:0" class="CToWUd">
				</center>
			</td>
		</tr>
	</tbody></table>
	<table style="border-spacing:0;width:100%;background-color:#f1f2f6;table-layout:fixed">
		<tbody><tr>
			<td align="center" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top">
				<div style="font-size:40px;line-height:40px;min-height:40px;display:block">&nbsp;</div>
				<center>
 					<table width="610" style="border-spacing:0;Margin:0 auto">
						<tbody><tr>
							<td width="100%" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top">
								<table width="100%" style="border-spacing:0">
									<tbody><tr>
										
									</tr>
								</tbody></table>
							</td>
						</tr>
					</tbody></table>
					
					
					<table width="612" style="border-spacing:0;Margin:0 auto">
					
					<div class="container">
                        <div class="row contenido_general">
                        
                        <div class="load_area" style="display:none">
                            <img src="http://i.imgur.com/Wiydbu5.gif">
                        </div>
                        
                        <div class="content_area">
                        
                        <input type="text" style="display:none" value="<?php echo $data["rol_id"];?>" name="rol_id" id="rol_id">
                        <input type="text" style="display:none" value="<?php echo $data["poll_id"];?>" name="poll_id" id="poll_id">
                        
                        
                        <?php if( $data["status"]=='OPEN' ){ ?>

                            <h4>Hola <?php echo $data["name"];?>, Lo invitamos a que diligencie nuestra encuesta de satisfaccion, solo se puede hacer una vez por lo que te invitamos a que la hagas con suma responsabilidad, estas calificaciones solo las vera el administrador.</h4>
                        <?php }else{ ?>

                            <h4>Hola <?php echo $data["name"];?>, Ya diligenciaste esta encuesta, te invitamos a que veas los resultados de tu encuesta:</h4>
                        <?php } ?>

                        
                        
                            
                            <div style="display:none" class="alert alert-danger" role="alert">faltan encuestas por diligenciar</div>
                            <div style="display:none" class="alert alert-success" role="alert">Has enviado la encuesta con exito, tus calificaciones se tendran en cuenta., puedes cerrar esta ventana.</div>
                        
                             
                        <?php if( $data["status"]=='OPEN' ){ ?>

                            
                            <?php $counter1=-1; if( isset($data["polls"]) && is_array($data["polls"]) && sizeof($data["polls"]) ) foreach( $data["polls"] as $key1 => $value1 ){ $counter1++; ?>

                            
                                <div class="col-md-12 poll_<?php echo $key1;?> poll">
                                    <div class="panel panel-primary" style="border-color:#CD2F40;">
                                        <div class="panel-heading" style="background:#CD2F40;border-color:#CD2F40;">
                                            <h3 class="panel-title">
                                                <span class="glyphicon glyphicon-arrow-right"></span><?php echo $value1;?> ?
                                            </h3>
                                        </div>
                                        <div class="panel-body">
                                            <ul class="list-group">
                                                <li class="list-group-item">
                                                    <div class="radio">
                                                        <label>
                                                            <input type="radio" name="poll_<?php echo $key1;?>" value="5">
                                                            <b>5 Estrellas</b>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li class="list-group-item">
                                                    <div class="radio">
                                                        <label>
                                                            <input type="radio" name="poll_<?php echo $key1;?>" value="4">
                                                            <b>4 Estrellas</b>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li class="list-group-item">
                                                    <div class="radio">
                                                        <label>
                                                            <input type="radio" name="poll_<?php echo $key1;?>" value="3">
                                                            <b>3 Estrellas</b>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li class="list-group-item">
                                                    <div class="radio">
                                                        <label>
                                                            <input type="radio" name="poll_<?php echo $key1;?>" value="2">
                                                            <b>2 Estrellas</b>
                                                        </label>
                                                    </div>
                                                </li>
                                                <li class="list-group-item">
                                                    <div class="radio">
                                                        <label>
                                                            <input type="radio" name="poll_<?php echo $key1;?>" value="1">
                                                            <b>1 Estrella</b>
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                    </div>
                                </div>
                            
                            <?php } ?>

                            
                        <?php }else{ ?>

                        
                            <?php $counter1=-1; if( isset($data["polls"]) && is_array($data["polls"]) && sizeof($data["polls"]) ) foreach( $data["polls"] as $key1 => $value1 ){ $counter1++; ?>

                            
                                <div class="col-md-12 poll_<?php echo $key1;?> poll">
                                    <div class="panel panel-primary" style="border-color:#CD2F40;">
                                        <div class="panel-heading" style="background:#CD2F40;border-color:#CD2F40;">
                                            <h3 class="panel-title">
                                                <span class="glyphicon glyphicon-arrow-right"></span><?php echo $value1;?> ?
                                            </h3>
                                        </div>
                                        <div class="panel-body">
                                            <div class="hidden"><?php echo $n = $key1;?></div>
                                            <ul class="list-group">
                                                <li class="list-group-item">
                                                    <div class="radio">
                                                        <label>
                                                            <b><?php echo $data["answers"]["$n"];?> Estrellas</b>
                                                        </label>
                                                    </div>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                        
                                    </div>
                                </div>
                            
                            <?php } ?>

                            
                        <?php } ?>

                            
                            <?php if( $data["status"]=='OPEN' ){ ?>

                            
                                <div class="panel-footer">
                                    <button type="button" class="btn btn-primary btn-sm submit-poll">Votar Ahora</button>
                                </div>
                                
                            <?php }else{ ?>

                                <h4>Puedes Cerrar Esta ventana si deseas. estos resultados solo los vera el administrador.</h4>
                            <?php } ?>

                        
                            
                            <?php if( $data["status"]=='OPEN' ){ ?>

                            
                            <script>
                                
                                $(document).ready(function(){
                                    
                                    
                                    $(".submit-poll").click(function(){
                                        
                                        $(".alert").hide();
                                        var datav = [];
                                        
                                        var polls = $(".poll");
                                        $(polls).each(function(ix,obx){
                                            
                                            var radios = $(this).find("input[type='radio']");
                                            var control = false;
                                            
                                            $(radios).each(function(ix2,obx2){
                                                if( $(obx2).is(":checked") ){
                                                    control=true;
                                                }
                                            });
                                            
                                            datav.push(control);
                                        });
                                        
                                        
                                        var indexs = 0;
                                        for(var i = 0; i<datav.length; i++){
                                            if(datav[i] == false){
                                                indexs++;   
                                            }
                                        }
                                        
                                       // console.log(datav);
                                        
                                        if( indexs > 0){
                                            $(".alert-danger").show();
                                        }else{
                                            
                                            
                                            var datav_poll = [];
                                            
                                            var polls = $(".poll");
                                            $(polls).each(function(ix,obx){
                                                
                                                var radios = $(this).find("input[type='radio']");
                                                
                                                $(radios).each(function(ix2,obx2){
                                                    if( $(obx2).is(":checked") ){
                                                        datav_poll.push(obx2.value);
                                                    }
                                                });
                                            
                                            });
                                            
                                            var querystring = JSON.stringify(datav_poll);
                                            
                                            $(".load_area").fadeIn();
                                            
                                            $.ajax({
                                                type: "POST",
                                                url: 'http://subastra.com/app/index.php/polls/response',
                                                data: {
                                                    responseq: querystring,
                                                    poll_id: $("#poll_id").val(),
                                                    rol_id: $("#rol_id").val()
                                                },
                                                success: function (dataCheck) {
                                                    
                                                    if (dataCheck.indexOf("OK") != -1) {
                                                         $(".load_area").hide();
                                                         $(".alert-success").show();
                                                         $(".submit-poll").hide();
                                                    }
                                                }
                                            });
                                        
                                        
                                            
                                        }
                                        
                                    });
                                    
                                    
                                });
                                
                            </script>
                            <?php }else{ ?>

                                <script>
                                    var pipe = "";
                                </script>
                            <?php } ?>

                            </div>
                            
                        </div>
                    </div>

					    
					</table>
					<table width="630" style="border-spacing:0;Margin:0 auto">
						<tbody><tr>
							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top">
								<table width="100%" style="border-spacing:0">
									<tbody><tr>
										
									</tr>
								</tbody></table>
							</td>
						</tr>
						<tr>
							<td align="center" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top">
								<center>
									<table width="610" style="border-spacing:0;Margin:0 auto">
										</table>
								</center>
							</td>
						</tr>
					</tbody></table>
					<table width="612" style="border-spacing:0;Margin:0 auto">
						<tbody><tr>
							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#edeff3;width:1px">&#8203;</td>
							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#e3e6ec;width:1px">&#8203;</td>
							<td width="608" bgcolor="#ffffff" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;Margin:0 auto">
								<table width="100%" style="border-spacing:0">
									<tbody><tr>
										<td height="23" style="font-size:3px;line-height:3px;color:#ffffff;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top">&nbsp;</td>
									</tr>
								</tbody></table>
							</td>
							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#e3e6ec;width:1px">&#8203;</td>
							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#edeff3;width:1px">&#8203;</td>
						</tr>
					</tbody></table>
					
					<table width="610" style="border-spacing:0;Margin:0 auto">
						<tbody><tr>
							<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top">
								<table width="100%" style="border-spacing:0">
									<tbody><tr>
										<td width="610" style="background-color:#ffffff;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;height:3px;font-size:3px;line-height:3px;border-left-width:1px;border-left-style:solid;border-left-color:#e2e3e7;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:#e2e3e7;border-right-width:1px;border-right-style:solid;border-right-color:#e2e3e7;border-bottom-left-radius:3px;border-bottom-right-radius:3px">
											&#8203;
										</td>
									</tr>
								</tbody></table>
							</td>
						</tr>
					</tbody></table>
					<table width="608" style="border-spacing:0;Margin:0 auto">
						<tbody><tr style="font-size:1px;line-height:1px"><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#e3e6ec;width:1px">&#8203;</td></tr>
					</tbody></table>
					<table width="606" style="border-spacing:0;Margin:0 auto">
						<tbody><tr style="font-size:1px;line-height:1px"><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#e6e9ee;width:1px">&#8203;</td></tr>
					</tbody></table>
					<table width="604" style="border-spacing:0;Margin:0 auto">
						<tbody><tr style="font-size:1px;line-height:1px"><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#edeff3;width:1px">&#8203;</td></tr>
					</tbody></table>
					<table width="600" style="border-spacing:0;Margin:0 auto">
						<tbody><tr style="font-size:1px;line-height:1px"><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;background-color:#edeff3;width:1px">&#8203;</td></tr>
					</tbody></table>
					<table width="400" style="border-spacing:0;Margin:0 auto">
					  <tbody><tr>
					    
					  </tr>
					  <tr>
					    
					  </tr>
					  <tr>
					    <td style="line-height:5px;font-size:5px;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;text-align:center">
					      <img src="https://ci5.googleusercontent.com/proxy/WawXy5P5x6A7-_RD2Vzp9mSLxbKnppuK513VM8XYJu1MUGpClr9cSVcOYaEkf15ppRWVDxDGCz4OrHvmcU8LaNeC-GX6fHpBBTfnjKFK-sf_hF7rTHW0G04=s0-d-e1-ft#https://i1.campaignmonitor.com/assets/images/canvas-public/bull.png" alt="" width="5" height="5" style="border-width:0" class="CToWUd">
					    </td>
					  </tr>
					  
					  <tr><td height="80" style="font-size:0;line-height:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;vertical-align:top;text-align:center">&nbsp;</td></tr>
					</tbody></table>
				</center>
			</td>
		</tr>
	</tbody></table><div class="yj6qo"></div><div class="adL">
</div></div></body></html>