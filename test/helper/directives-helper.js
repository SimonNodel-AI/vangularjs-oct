var directivesHelper = {
    testDirectiveExpansion: function(parameters) {
        (function () {
            describe('simple expansion', function () {
                var testElement;
                beforeEach(inject(function ($rootScope, $compile, $templateCache) {
                    $templateCache.put(parameters.templateCacheKey, '<span class="foobar">dummy content</span>');
                    testElement = angular.element(parameters.testHtml);
                    $compile(testElement)($rootScope);
                    angular.element('document.body').append(testElement);
                    $rootScope.$digest();
                }));

                it('should expand the directive', function () {
                    expect(testElement.html()).toContain('dummy content');
                });
            });
        }());
    }
};
