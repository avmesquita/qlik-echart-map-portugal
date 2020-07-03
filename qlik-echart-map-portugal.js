define([ "qlik","jquery","./echarts", "./municipios"],
function ( qlik,$,echarts) {
	return {
		initialProperties: {
			qHyperCubeDef: {
				qDimensions: [],
				qMeasures: [],
				qInitialDataFetch: [{
					qWidth: 20,
					qHeight: 499,
				}]
			}
		},
		definition: {
			type: "items",
			component: "accordion",
			items: {
				/*
				dimensions: {
					uses: "dimensions",
					min: 1,
					max: 1
				},
				measures: {
					uses: "measures",
					min: 1,
					max: 19
				},				
				settings: {
					uses: "settings"
				},
				*/
				SectionB:{
                    type: "items",
                    		label: "About",
                    		items:{
							About0: {
	                            label: "Qlik eChart Portugal Map V1.0",
	                            component: "text",
	                            },							
							About1: {
								label: 'Qlik eChart Portugal Map',
	                            url: "https://github.com/avmesquita/qlik-echart-map-portugal",
	                            component: "link",
	                            },
				}}				
			}
		},
		support : {
			snapshot: true,
			export: true,
			exportData : false
		},
		
		paint: function ($element,layout) {
			
			var map_id=Math.round(Math.random()*10000);
			var html="",self = this; 
			$element.html(html);
			$element.append('<div id="'+map_id+'" style="width:100%;height:100%;"></div>');
			
			var app=qlik.currApp();
			var qtable=qlik.table(this);			
			
			var dataGraph=[];
			
			$.each(PortugalMap.features,function(key, value){				
				dataGraph.push(value.properties);
			});

			/*
			var q_indicators=[];
			var max_list=[];
			var dim_info='';
			$.each(self.backendApi.getDimensionInfos(),function(key, value){
				//console.log(value["qFallbackTitle"]);
				dim_info=value["qFallbackTitle"];
				//console.log(value);
			});			
			$.each(self.backendApi.getMeasureInfos(),function(key, value){
				//console.log(key);
				//console.log(value["qFallbackTitle"]);
				max_list.push(0);
			});
			//console.log(max_list);
			//console.log(q_indicators);
			var q_data=[];
			var q_legend=[];
			
			//console.log(qtable["rows"]);
			self.backendApi.eachDataRow(function(rownum,row){
				var temp_data=[];
				$.each(row,function(item_no,item){
					if(item_no>0){
						temp_data.push(item["qNum"]);
						if(item["qNum"]>max_list[item_no-1]){
							max_list[item_no-1]=item["qNum"];
						};
					};
				});
				var q_data_temp={
							value : temp_data,
							name : row[0]["qText"],
							symbolSize:layout.NormalSymbolSize,
							symbol:layout.SymbolType,

				};
				q_legend.push(row[0]["qText"]);
				q_data.push(q_data_temp);
			});
			
			if (layout.MaxList!=""){
				max_list=eval(layout.MaxList);
			};
			
			
			$.each(self.backendApi.getMeasureInfos(),function(key, value){
				//console.log(key);
				//console.log(value["qFallbackTitle"]);
				q_indicators.push({name:value["qFallbackTitle"],max:max_list[key]});
			});
			//#######eCharts Options#########
			var option = {
				title: {
					text: layout.radar_name
				},
				tooltip: {},
				legend: {
					//show:false,
					data: q_legend,
				},
				radar: {
					// shape: 'circle',
					name: {
						textStyle: {
							color: '#fff',
							backgroundColor: '#999',
							borderRadius: 3,
							padding: [3, 5]
					   }
					},
					indicator: q_indicators,
				},
				series: [{
					name: layout.radar_name,
					type: 'radar',
					areaStyle: {normal:{}},
					data : q_data,
					itemStyle:{
					normal:{
					lineStyle:{}
					},
					emphasis:{
					lineStyle:{}
					},
					},
				}]
			};
			
			option["legend"][layout.LegendPosition.split(":")[0]]=layout.LegendPosition.split(":")[1];
			if(layout.LegendPosition==""){
					option["legend"]["show"]=false;
			};
			if(layout.ColorList!=""){
					option["color"]=eval(layout.ColorList);
			};
			if(layout.RadarShape==true){
					option["radar"]["shape"]='circle';
			};
			option["series"][0]["areaStyle"]["normal"]["opacity"]=layout.RadarOpacity;
			option["series"][0]["itemStyle"]["normal"]["lineStyle"]["width"]=layout.NormalLineWidth;			
			option["series"][0]["itemStyle"]["emphasis"]["lineStyle"]["width"]=layout.EmphasisLineWidth;			
			
			
			
			var myChart = echarts.init(document.getElementById(map_id),layout.RadarTheme);
			myChart.setOption(option);
			myChart.on('click', function (params) {
					var temp_select_list=[];
					temp_select_list.push({qText:params["data"]["name"]});
					app.field(dim_info).selectValues(temp_select_list,true,true);
					// do something
				});
            */

            var myChart = echarts.init(document.getElementById(map_id));
			
			myChart.showLoading();			

			echarts.registerMap('Portugal', PortugalMap , {	});
			
			option = {
				title: {
					text: 'Áreas dos Concelhos de Portugal',
					subtext: 'Direção-Geral do Território',
					sublink: 'http://www.dgterritorio.pt/cartografia_e_geodesia/cartografia/carta_administrativa_oficial_de_portugal_caop/caop__download_/carta_administrativa_oficial_de_portugal___versao_2019__em_vigor_/',
					left: 'left'
				},
				tooltip: {
					trigger: 'item',
					showDelay: 0,
					transitionDuration: 0.2,
					formatter: function (params) {
						//var value = (params.value + '').split('.');
						//value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
						return 'Distrito: ' + params.data.Distrito + '<br/>Concelho: ' + params.data.name + '<br/>TAA: ' + params.data.TAA + '<br/>Area T: ' + params.data.AREA_T_HA + '<br/>Area EA:' + params.data.AREA_EA_HA;
					}
				},
				/*
				visualMap: {
					left: 'right',
					min: 0,
					max: 50000,
					inRange: {
						color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
					},
					text: ['High', 'Low'],           
					calculable: true
				},*/
				toolbox: {
					show: true,
					//orient: 'vertical',
					left: 'left',
					top: 'bottom',
					feature: {
						dataView: {readOnly: false, title:'View'},
						restore: { title: 'Refresh' },
						saveAsImage: { title: 'Save' }
					}
				},
				series: [
					{
						name: 'Area',
						type: 'map',
						roam: true,
						map: 'Portugal',
						emphasis: {
							label: {
								show: true
							}
						},							
						textFixed: {								
						},
						data: dataGraph 
					}
				]
			};				
			myChart.setOption(option);				
			myChart.hideLoading();
	    }
	};
});

