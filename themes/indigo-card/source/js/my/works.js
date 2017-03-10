/**
 * @author: admin
 * @description:
 * @Date: 2017/3/10 14:16
 */
(function($){
    'use strict'

    window.App = window.App || {}

    App.city = [
        'szWorks'
    ]

    App.works = {

        init() {
            this.__initVue()
        },

        __initVue: function () {
            var self = this,
                allworksComponents = {
                    template: tplWorksList,
                    props: ['allWorksInfo']
                }

            var vm = new Vue({
                el: '#app',
                data: function () {
                    return {
                        szWorks: {}
                    }
                },
                components: {
                    'all-works-list': allworksComponents
                },
                created: function () {
                    this._setData();
                },
                methods: {
                    _setData: function () {
                        var self = this,
                            reqs = []

                        for(var i = 0; i < App.city.length; i++){
                            reqs.push($.get('/data/' + App.city[i] + '.json'))
                        }

                        $.when.apply($, reqs).then(function(data1, data2, data3){
                            for(var i=0,len = App.city.length; i < len; i++){
                                self[App.city[i]] = arguments[i]
                            }
                        })
                    }
                }
            })
        },

    }

    App.works.init();


}(jQuery))
